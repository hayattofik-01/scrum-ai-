import { useState, useEffect } from "react";
import { DashboardLayout } from "./Dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/lib/api";
import { Loader2, AlertCircle, CheckCircle2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const Reports = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [rollingTasks, setRollingTasks] = useState<any[]>([]);
    const [blockers, setBlockers] = useState<any[]>([]);

    const fetchData = async () => {
        setIsFetching(true);
        try {
            const [tasksRes, blockersRes] = await Promise.all([
                api.get("/reports/rolling-tasks"),
                api.get("/reports/team-summary") // Using this as general report/blocker fetch
            ]);
            setRollingTasks(tasksRes.data || []);
            // Assuming blockers might be nested or direct depending on API implementation
            setBlockers(blockersRes.data || []);
        } catch (error) {
            console.error("Failed to fetch reports", error);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchData();
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
                                                <CardTitle className="text-lg">{task.task_name}</CardTitle>
                                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-bold uppercase">
                                                    {task.days_rolling} Days
                                                </span>
                                            </div>
                                            <CardDescription>Detected across multiple standups</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm">{task.description}</p>
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
                                blockers.map((blocker, index) => (
                                    <Card key={index} className="overflow-hidden border-l-4 border-l-destructive">
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center gap-2">
                                                <AlertCircle className="w-5 h-5 text-destructive" />
                                                <CardTitle className="text-lg">Critical Blocker Identified</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm font-medium">{blocker.summary}</p>
                                            <div className="mt-4 pt-4 border-t text-xs text-muted-foreground flex justify-between">
                                                <span>Impact: High</span>
                                                <span>Detected by AI Worker</span>
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
