import { useState, useEffect } from "react";
import { DashboardLayout } from "./Dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/api";
import {
    ShieldAlert,
    UserCog,
    Mail,
    Search,
    Loader2,
    ShieldCheck,
    User,
    ArrowUpCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Admin = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [emailToUpgrade, setEmailToUpgrade] = useState("");
    const [isUpgrading, setIsUpgrading] = useState(false);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await api.get("/admin/users");
            setUsers(response.data || []);
        } catch (error) {
            console.error("Failed to fetch users", error);
            toast.error("Admin permissions required to view users");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUpgradeByEmail = async () => {
        if (!emailToUpgrade.trim()) return;
        setIsUpgrading(true);
        try {
            // Find user first
            const userRes = await api.get(`/admin/users/email/${emailToUpgrade}`);
            const user = userRes.data;

            // Upgrade role
            await api.put(`/admin/users/${user.id}`, { role: "admin" });
            toast.success(`Successfully upgraded ${user.full_name} to Admin!`);
            setEmailToUpgrade("");
            fetchUsers();
        } catch (error: any) {
            if (error.response?.status === 404) {
                toast.error("User not found with that email");
            } else {
                toast.error("Failed to upgrade user");
            }
        } finally {
            setIsUpgrading(false);
        }
    };

    const toggleRole = async (userId: string, currentRole: string) => {
        const newRole = currentRole === "admin" ? "user" : "admin";
        try {
            await api.put(`/admin/users/${userId}`, { role: newRole });
            toast.success(`User role updated to ${newRole}`);
            fetchUsers();
        } catch (error) {
            toast.error("Failed to update user role");
        }
    };

    const filteredUsers = users.filter(user =>
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout title="Admin Console">
            <div className="space-y-6">
                <div className="bg-destructive/5 border border-destructive/20 p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive">
                        <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-lg font-bold">Quick Role Upgrade</h3>
                        <p className="text-sm text-muted-foreground">Enter a user's email to grant them administrative privileges.</p>
                    </div>
                    <div className="flex w-full md:w-auto gap-2">
                        <div className="relative flex-1 md:w-64">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="user@example.com"
                                className="pl-10 h-10 rounded-xl"
                                value={emailToUpgrade}
                                onChange={(e) => setEmailToUpgrade(e.target.value)}
                            />
                        </div>
                        <Button
                            onClick={handleUpgradeByEmail}
                            disabled={isUpgrading || !emailToUpgrade.trim()}
                            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl"
                        >
                            {isUpgrading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Upgrade"}
                        </Button>
                    </div>
                </div>

                <div className="flex justify-between items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search users by name or email..."
                            className="pl-10 rounded-xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <Card className="rounded-3xl border-2 overflow-hidden">
                    <CardHeader className="bg-muted/10">
                        <CardTitle>System Users</CardTitle>
                        <CardDescription>Manage user roles and system access.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        {isLoading ? (
                            <div className="flex justify-center p-20">
                                <Loader2 className="w-8 h-8 animate-spin text-primary opacity-50" />
                            </div>
                        ) : (
                            <div className="overflow-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                                        <tr>
                                            <th className="px-6 py-3 text-left">User</th>
                                            <th className="px-6 py-3 text-left">Email</th>
                                            <th className="px-6 py-3 text-left">Role</th>
                                            <th className="px-6 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {filteredUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-muted/20 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                                                            {user.full_name?.charAt(0)}
                                                        </div>
                                                        <span className="font-medium">{user.full_name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                                                <td className="px-6 py-4">
                                                    <Badge variant={user.role === "admin" ? "default" : "secondary"} className="rounded-md uppercase text-[10px] font-bold">
                                                        {user.role}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="rounded-lg h-8 px-2 hover:bg-primary/10 hover:text-primary"
                                                        onClick={() => toggleRole(user.id, user.role)}
                                                    >
                                                        {user.role === "admin" ? (
                                                            <User className="w-4 h-4 mr-2" />
                                                        ) : (
                                                            <ShieldCheck className="w-4 h-4 mr-2" />
                                                        )}
                                                        {user.role === "admin" ? "Demote" : "Promote"}
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Admin;
