import { useState, useEffect } from "react";
import { DashboardLayout } from "./Dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/api";
import {
    Users,
    Plus,
    UserPlus,
    Loader2,
    Shield,
    Mail,
    Search
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const Teams = () => {
    const [teams, setTeams] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newTeamName, setNewTeamName] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchTeams = async () => {
        setIsLoading(true);
        try {
            const response = await api.get("/teams");
            setTeams(response.data || []);
        } catch (error) {
            console.error("Failed to fetch teams", error);
            toast.error("Could not load teams");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleCreateTeam = async () => {
        if (!newTeamName.trim()) return;
        setIsCreating(true);
        try {
            await api.post("/teams", { name: newTeamName });
            toast.success("Team created successfully!");
            setNewTeamName("");
            fetchTeams();
        } catch (error) {
            console.error("Failed to create team", error);
            toast.error("Failed to create team");
        } finally {
            setIsCreating(false);
        }
    };

    const addMember = async (teamId: string, email: string) => {
        if (!email.trim()) return;
        try {
            // First find user by email
            const userRes = await api.get(`/admin/users/email/${email}`);
            const user = userRes.data;

            await api.post(`/teams/${teamId}/members`, { user_id: user.id });
            toast.success(`Added ${user.full_name} to the team!`);
            fetchTeams();
        } catch (error: any) {
            if (error.response?.status === 404) {
                toast.error("User not found with that email");
            } else if (error.response?.status === 403) {
                toast.error("Admin permissions required to find users by email");
            } else {
                toast.error("Failed to add member");
            }
        }
    };

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout title="Team Management">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <p className="text-muted-foreground italic">Organize your workspace and manage team access.</p>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="rounded-xl shadow-lg shadow-primary/20">
                                <Plus className="w-4 h-4 mr-2" />
                                Create New Team
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] rounded-3xl border-2">
                            <DialogHeader>
                                <DialogTitle>Create Team</DialogTitle>
                                <DialogDescription>
                                    Give your new team a name to get started.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Input
                                        placeholder="Engineering, Design, Marketing..."
                                        value={newTeamName}
                                        onChange={(e) => setNewTeamName(e.target.value)}
                                        className="rounded-xl h-12"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    onClick={handleCreateTeam}
                                    disabled={isCreating || !newTeamName.trim()}
                                    className="rounded-xl px-8"
                                >
                                    {isCreating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    Create Team
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search teams..."
                        className="pl-10 rounded-xl"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {isLoading ? (
                    <div className="flex justify-center p-20">
                        <Loader2 className="w-10 h-10 animate-spin text-primary opacity-50" />
                    </div>
                ) : filteredTeams.length === 0 ? (
                    <Card className="bg-muted/10 border-dashed rounded-3xl">
                        <CardContent className="flex flex-col items-center justify-center p-12 text-muted-foreground">
                            <Users className="w-16 h-16 mb-4 opacity-10" />
                            <p className="text-lg font-medium">No teams found.</p>
                            <p className="text-sm">Create a team to start collaborating.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredTeams.map((team) => (
                            <TeamCard key={team.id} team={team} onAddMember={addMember} />
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

const TeamCard = ({ team, onAddMember }: { team: any, onAddMember: (id: string, email: string) => void }) => {
    const [email, setEmail] = useState("");

    return (
        <Card className="rounded-3xl border-2 overflow-hidden hover:border-primary/50 transition-colors flex flex-col">
            <CardHeader className="bg-muted/30 pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{team.name}</CardTitle>
                    <Badge variant="outline" className="bg-background">{team.members?.length || 0} Members</Badge>
                </div>
                <CardDescription className="line-clamp-1">{team.description || "Project channel"}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 flex-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Members</h4>
                <div className="space-y-2 max-h-[160px] overflow-auto pr-2 scrollbar-thin">
                    {(team.members || []).map((member: any) => (
                        <div key={member.id} className="flex items-center gap-2 p-2 rounded-xl bg-muted/20 text-sm">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                                {member.full_name?.charAt(0)}
                            </div>
                            <span className="flex-1 truncate">{member.full_name}</span>
                            {member.role === "admin" && <Shield className="w-3 h-3 text-primary" />}
                        </div>
                    ))}
                    {(!team.members || team.members.length === 0) && (
                        <p className="text-xs text-muted-foreground italic p-2">No members yet.</p>
                    )}
                </div>
            </CardContent>
            <CardFooter className="pt-4 border-t bg-muted/10">
                <div className="flex w-full gap-2">
                    <div className="relative flex-1">
                        <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                        <Input
                            placeholder="Add by email..."
                            className="h-9 pl-8 text-xs rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <Button
                        size="sm"
                        variant="secondary"
                        className="h-9 px-3 rounded-lg"
                        onClick={() => {
                            onAddMember(team.id, email);
                            setEmail("");
                        }}
                    >
                        <UserPlus className="w-4 h-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default Teams;
