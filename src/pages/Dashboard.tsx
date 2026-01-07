import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    MessageSquare,
    BarChart3,
    LogOut,
    Settings,
    Menu,
    X,
    User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout, isAuthenticated } from "@/lib/auth";
import api from "@/lib/api";

interface SidebarItemProps {
    to: string;
    icon: React.ReactNode;
    label: string;
    active: boolean;
}

const SidebarItem = ({ to, icon, label, active }: SidebarItemProps) => (
    <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
    >
        {icon}
        <span className="font-medium">{label}</span>
    </Link>
);

const DashboardLayout = ({ children, title }: { children: React.ReactNode; title: string }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await api.get("/me");
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user", error);
            }
        };

        fetchUser();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-muted/30 flex">
            {/* Sidebar for Desktop */}
            <aside className="hidden lg:flex w-64 flex-col border-r bg-background p-6">
                <div className="flex items-center gap-2 mb-10 px-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">S</div>
                    <span className="font-display font-bold text-xl tracking-tight">ScrumAI</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <SidebarItem
                        to="/dashboard"
                        icon={<LayoutDashboard className="w-5 h-5" />}
                        label="Dashboard"
                        active={location.pathname === "/dashboard"}
                    />
                    <SidebarItem
                        to="/standups"
                        icon={<MessageSquare className="w-5 h-5" />}
                        label="Standups"
                        active={location.pathname === "/standups"}
                    />
                    <SidebarItem
                        to="/reports"
                        icon={<BarChart3 className="w-5 h-5" />}
                        label="AI Reports"
                        active={location.pathname === "/reports"}
                    />
                </nav>

                <div className="pt-6 border-t space-y-2">
                    <SidebarItem
                        to="#"
                        icon={<Settings className="w-5 h-5" />}
                        label="Settings"
                        active={false}
                    />
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-16 border-b bg-background/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                        <h2 className="text-lg font-semibold">{title}</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-sm font-medium">{user?.full_name || "Loading..."}</span>
                            <span className="text-xs text-muted-foreground capitalize">{user?.role || ""}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
                            <User className="w-6 h-6 text-muted-foreground" />
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-6 md:p-10">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <aside
                        className="w-64 h-full bg-background border-r p-6 flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">S</div>
                                <span className="font-display font-bold text-xl tracking-tight">ScrumAI</span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        <nav className="flex-1 space-y-2">
                            <SidebarItem
                                to="/dashboard"
                                icon={<LayoutDashboard className="w-5 h-5" />}
                                label="Dashboard"
                                active={location.pathname === "/dashboard"}
                            />
                            <SidebarItem
                                to="/standups"
                                icon={<MessageSquare className="w-5 h-5" />}
                                label="Standups"
                                active={location.pathname === "/standups"}
                            />
                            <SidebarItem
                                to="/reports"
                                icon={<BarChart3 className="w-5 h-5" />}
                                label="AI Reports"
                                active={location.pathname === "/reports"}
                            />
                        </nav>

                        <div className="pt-6 border-t mt-auto space-y-2">
                            <button
                                onClick={logout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    </aside>
                </div>
            )}
        </div>
    );
};

const Dashboard = () => {
    return (
        <DashboardLayout title="Overview">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-background p-6 rounded-2xl border shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Recent Standups</h3>
                    <p className="text-2xl font-bold mt-1">Pending Analysis</p>
                    <div className="mt-4">
                        <Link to="/standups" className="text-primary text-sm font-medium hover:underline">View All →</Link>
                    </div>
                </div>

                <div className="bg-background p-6 rounded-2xl border shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 text-orange-500">
                        <BarChart3 className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Identified Blockers</h3>
                    <p className="text-2xl font-bold mt-1">Scanning Team...</p>
                    <div className="mt-4">
                        <Link to="/reports" className="text-primary text-sm font-medium hover:underline">Check Reports →</Link>
                    </div>
                </div>

                <div className="bg-background p-6 rounded-2xl border shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 text-green-500">
                        <LayoutDashboard className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Team Progress</h3>
                    <p className="text-2xl font-bold mt-1">AI Generating Insights</p>
                    <div className="mt-4">
                        <span className="text-muted-foreground text-sm">Updated 5m ago</span>
                    </div>
                </div>
            </div>

            <div className="mt-10 bg-background rounded-3xl border shadow-sm overflow-hidden">
                <div className="p-8 border-b">
                    <h3 className="text-xl font-bold">Welcome to ScrumAI</h3>
                    <p className="text-muted-foreground mt-1">The distributed AI system is ready to analyze your standups.</p>
                </div>
                <div className="p-8 space-y-6">
                    <div className="flex gap-6 items-start">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold">1</div>
                        <div>
                            <h4 className="font-semibold text-lg">Submit your daily standup</h4>
                            <p className="text-muted-foreground mt-1">Go to the Standups page and tell us what you did, what you're doing, and what's blocking you.</p>
                        </div>
                    </div>
                    <div className="flex gap-6 items-start">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold">2</div>
                        <div>
                            <h4 className="font-semibold text-lg">Wait for AI processing</h4>
                            <p className="text-muted-foreground mt-1">The background workers will automatically process your standup using GPT-4o.</p>
                        </div>
                    </div>
                    <div className="flex gap-6 items-start">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold">3</div>
                        <div>
                            <h4 className="font-semibold text-lg">View team insights</h4>
                            <p className="text-muted-foreground mt-1">Monitor the Reports page to see automatically identified blockers and rolling tasks across your team.</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
export { DashboardLayout };
