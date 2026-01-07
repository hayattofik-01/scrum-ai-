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
    User,
    Users,
    Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout, isAuthenticated } from "@/lib/auth";
import api from "@/lib/api";
import { RefreshCcw, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

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
                    <SidebarItem
                        to="/teams"
                        icon={<Users className="w-5 h-5" />}
                        label="Teams"
                        active={location.pathname === "/teams"}
                    />
                    {user?.role === "admin" && (
                        <SidebarItem
                            to="/admin"
                            icon={<Shield className="w-5 h-5" />}
                            label="Admin Console"
                            active={location.pathname === "/admin"}
                        />
                    )}
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
                            <SidebarItem
                                to="/teams"
                                icon={<Users className="w-5 h-5" />}
                                label="Teams"
                                active={location.pathname === "/teams"}
                            />
                            {user?.role === "admin" && (
                                <SidebarItem
                                    to="/admin"
                                    icon={<Shield className="w-5 h-5" />}
                                    label="Admin Console"
                                    active={location.pathname === "/admin"}
                                />
                            )}
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
    const [stats, setStats] = useState({
        standupsCount: 0,
        blockersCount: 0,
        rollingTasksCount: 0,
        isLoading: true
    });
    const [error, setError] = useState<string | null>(null);

    const location = useLocation();

    const fetchStats = async () => {
        setStats(prev => ({ ...prev, isLoading: true }));
        setError(null);
        try {
            const userRes = await api.get("/me");
            let teamId = userRes.data.team_id;

            if (!teamId) {
                // Fallback: Fetch teams and use the first one
                const teamsRes = await api.get("/teams");
                if (teamsRes.data && teamsRes.data.length > 0) {
                    teamId = teamsRes.data[0].id;
                    console.log("Dashboard: Found team via fallback:", teamId);
                }
            }

            if (!teamId) {
                console.warn("User has no team identified, dashboard stats will be empty");
                setStats(prev => ({ ...prev, isLoading: false }));
                return;
            }

            console.log("Fetching dashboard stats for team:", teamId);

            const [standupsRes, tasksRes, reportsRes] = await Promise.all([
                api.get(`/standups?team_id=${teamId}`),
                api.get(`/reports/rolling-tasks?team_id=${teamId}`),
                api.get(`/reports/team-summary?team_id=${teamId}`)
            ]);

            // For blockers, we count how many standups have non-empty blockers
            const standupsWithBlockers = standupsRes.data?.filter((s: any) => s.blockers && s.blockers.length > 0).length || 0;

            setStats({
                standupsCount: standupsRes.data?.length || 0,
                rollingTasksCount: tasksRes.data?.length || 0,
                blockersCount: standupsWithBlockers,
                isLoading: false
            });
        } catch (error: any) {
            console.error("Failed to fetch dashboard stats", error);
            setError("Failed to load live stats. Please try again.");
            setStats(prev => ({ ...prev, isLoading: false }));
            toast.error("Could not refresh dashboard data");
        }
    };

    useEffect(() => {
        if (location.pathname === "/dashboard") {
            fetchStats();

            // Auto-refresh every 30 seconds
            const interval = setInterval(fetchStats, 30000);
            return () => clearInterval(interval);
        }
    }, [location.pathname]);

    return (
        <DashboardLayout title="Overview">
            <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">Your team's health and project velocity at a glance.</p>
                <Button variant="outline" size="sm" onClick={fetchStats} disabled={stats.isLoading}>
                    <RefreshCcw className={`w-4 h-4 mr-2 ${stats.isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl flex items-center gap-3 mb-6">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{error}</span>
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-background p-6 rounded-2xl border shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Recent Standups</h3>
                    <p className="text-2xl font-bold mt-1">
                        {stats.isLoading ? "..." : `${stats.standupsCount} Submitted`}
                    </p>
                    <div className="mt-4">
                        <Link to="/standups" className="text-primary text-sm font-medium hover:underline">View All →</Link>
                    </div>
                </div>

                <div className="bg-background p-6 rounded-2xl border shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 text-orange-500">
                        <BarChart3 className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Identified Blockers</h3>
                    <p className="text-2xl font-bold mt-1">
                        {stats.isLoading ? "..." : `${stats.blockersCount} Active`}
                    </p>
                    <div className="mt-4">
                        <Link to="/reports" className="text-primary text-sm font-medium hover:underline">Check Reports →</Link>
                    </div>
                </div>

                <div className="bg-background p-6 rounded-2xl border shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 text-green-500">
                        <LayoutDashboard className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground">Rolling Tasks</h3>
                    <p className="text-2xl font-bold mt-1">
                        {stats.isLoading ? "..." : `${stats.rollingTasksCount} Detected`}
                    </p>
                    <div className="mt-4">
                        <span className="text-muted-foreground text-sm">AI Analyzed</span>
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
                            <p className="text-muted-foreground mt-1">Our AI system will automatically process and analyze your standup transcript.</p>
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
