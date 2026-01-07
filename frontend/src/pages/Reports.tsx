import { useState, useEffect } from "react";
import { DashboardLayout } from "./Dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/lib/api";
import { Loader2, AlertCircle, CheckCircle2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Reports = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [rollingTasks, setRollingTasks] = useState<any[]>([]);
    const [blockers, setBlockers] = useState<any[]>([]);

    const fetchData = async () => {
        setIsFetching(true);
        try {
            // Fetch current user to get team_id
            const userRes = await api.get("/me");
            const user = userRes.data;
            let teamId = user.team_id;

            if (!teamId) {
                const teamsRes = await api.get("/teams");
                if (teamsRes.data && teamsRes.data.length > 0) {
                    teamId = teamsRes.data[0].id;
                }
            }

            if (!teamId) {
                console.warn("No team identified for reports");
                setIsFetching(false);
                return;
            }

            const [tasksRes, blockersRes] = await Promise.all([
                api.get(`/reports/rolling-tasks?team_id=${teamId}`),
                api.get(`/reports/team-summary?team_id=${teamId}`)
            ]);
            setRollingTasks(tasksRes.data || []);
            setBlockers(blockersRes.data || []);
        } catch (error) {
            console.error("Failed to fetch reports", error);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchData();

        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <DashboardLayout title="AI Reports">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">AI-driven analysis of team performance and impediments.</p>
                    <Button variant="outline" size="sm" onClick={fetchData} disabled={isFetching}>
                        <RefreshCcw className={`w-4 h-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                </div>

                <Tabs defaultValue="rolling" className="w-full">
                    <TabsList className="bg-background border p-1 rounded-xl">
                        <TabsTrigger value="rolling" className="rounded-lg px-6">Rolling Tasks</TabsTrigger>
                        <TabsTrigger value="blockers" className="rounded-lg px-6">Blockers</TabsTrigger>
                    </TabsList>

                    <TabsContent value="rolling" className="mt-6">
                        <div className="grid gap-4">
                            {isFetching ? (
                                <div className="flex justify-center p-12">
                                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                                </div>
                            ) : rollingTasks.length === 0 ? (
                                <Card className="bg-muted/10 border-dashed">
                                    <CardContent className="flex flex-col items-center justify-center p-12 text-muted-foreground">
                                        <CheckCircle2 className="w-12 h-12 mb-4 opacity-20" />
                                        <p>No rolling tasks detected. Everything is moving smoothly!</p>
                                    </CardContent>
                                </Card>
                            ) : (
                                rollingTasks.map((task, index) => (
                                    <Card key={index} className="overflow-hidden border-l-4 border-l-blue-500">
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg">Ongoing Task</CardTitle>
                                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-bold uppercase">
                                                    {task.occurrence_count} Mentions
                                                </span>
                                            </div>
                                            <CardDescription>
                                                First seen: {new Date(task.first_mentioned).toLocaleDateString()}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm">{task.task_description}</p>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="blockers" className="mt-6">
                        <div className="grid gap-4">
                            {isFetching ? (
                                <div className="flex justify-center p-12">
                                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                                </div>
                            ) : blockers.length === 0 ? (
                                <Card className="bg-muted/10 border-dashed">
                                    <CardContent className="flex flex-col items-center justify-center p-12 text-muted-foreground">
                                        <CheckCircle2 className="w-12 h-12 mb-4 opacity-20" />
                                        <p>No active blockers identified by the AI.</p>
                                    </CardContent>
                                </Card>
                            ) : (
                                blockers.map((report, index) => (
                                    <Card key={index} className="overflow-hidden border-l-4 border-l-destructive">
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center gap-2">
                                                <AlertCircle className="w-5 h-5 text-destructive" />
                                                <CardTitle className="text-lg">Team Insight: {report.report_type}</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-sm font-medium space-y-4">
                                                {(() => {
                                                    const data = report.data;

                                                    // Handle the Key/Value pair array structure from Go
                                                    if (Array.isArray(data)) {
                                                        const insightItem = data.find(item => item.Key === 'insight');
                                                        if (insightItem && typeof insightItem.Value === 'string') {
                                                            return (
                                                                <div className="prose prose-sm max-w-none dark:prose-invert">
                                                                    <div className="whitespace-pre-wrap leading-relaxed text-foreground/90">
                                                                        {insightItem.Value}
                                                                    </div>
                                                                </div>
                                                            );
                                                        }

                                                        // Fallback for other array patterns
                                                        return (
                                                            <ul className="list-disc list-inside space-y-2">
                                                                {data.map((item: any, i: number) => (
                                                                    <li key={i} className="text-muted-foreground">
                                                                        {item.Key ? (
                                                                            <span><span className="font-bold text-foreground">{item.Key.replace(/_/g, ' ')}:</span> {typeof item.Value === 'object' ? '...' : String(item.Value)}</span>
                                                                        ) : JSON.stringify(item)}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        );
                                                    }

                                                    // Handle single string or other objects
                                                    if (typeof data === 'string') return <p className="whitespace-pre-wrap">{data}</p>;

                                                    return (
                                                        <div className="bg-muted/30 p-4 rounded-lg">
                                                            {Object.entries(data).map(([key, value]) => (
                                                                <div key={key} className="mb-2 last:mb-0">
                                                                    <span className="font-bold capitalize">{key.replace(/_/g, ' ')}:</span>
                                                                    <p className="mt-1 text-muted-foreground">{String(value)}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                            <div className="mt-4 pt-4 border-t text-xs text-muted-foreground flex justify-between items-center">
                                                <span>Generated on: {new Date(report.created_at).toLocaleDateString()}</span>
                                                <Badge variant="outline" className="text-[10px] uppercase font-bold px-2 py-0 border-primary/30 text-primary">AI Insight</Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default Reports;
