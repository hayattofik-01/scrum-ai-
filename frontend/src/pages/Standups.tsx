import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DashboardLayout } from "./Dashboard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/api";
import { toast } from "sonner";
import { Loader2, Plus, History, Clock, FileUp, Type, CheckCircle2, AlertCircle, ListTodo, ClipboardList } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const standupSchema = z.object({
    content: z.string().min(10, "Standup must be at least 10 characters.").max(1000, "Standup is too long."),
});

type StandupValues = z.infer<typeof standupSchema>;

const Standups = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<any[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [file, setFile] = useState<File | null>(null);
    const [analysisResult, setAnalysisResult] = useState<any | null>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (analysisResult && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [analysisResult]);

    const form = useForm<StandupValues>({
        resolver: zodResolver(standupSchema),
        defaultValues: {
            content: "",
        },
    });

    const fetchHistory = async () => {
        try {
            // Get user to get team_id
            const userRes = await api.get("/me");
            const teamId = userRes.data.team_id;

            if (!teamId) {
                setHistory([]);
                return;
            }

            const response = await api.get(`/standups?team_id=${teamId}`);
            setHistory(response.data);
        } catch (error) {
            console.error("Failed to fetch standups", error);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const onSubmit = async (data: StandupValues) => {
        setIsLoading(true);
        setAnalysisResult(null);
        try {
            // Fetch current user to get team_id
            const userRes = await api.get("/me");
            const user = userRes.data;

            let teamId = user.team_id;

            // If user has no team, list teams and pick the first one or create a default
            if (!teamId) {
                const teamsRes = await api.get("/teams");
                if (teamsRes.data && teamsRes.data.length > 0) {
                    teamId = teamsRes.data[0].id;
                } else {
                    // Create a default team if none exists
                    const newTeamRes = await api.post("/teams", { name: "Default Team" });
                    teamId = newTeamRes.data.id;
                    // Join user to team
                    await api.post(`/teams/${teamId}/members`, { user_id: user.id });
                }
            }

            const formData = new FormData();
            if (file) {
                formData.append("transcript", file);
            } else {
                const blob = new Blob([data.content], { type: 'text/plain' });
                formData.append("transcript", blob, "transcript.txt");
            }

            formData.append("team_id", teamId);
            formData.append("date", new Date().toISOString());
            formData.append("notes", "Submitted via Web Dashboard");

            const response = await api.post("/standups", formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const analyzedStandup = response.data;
            setAnalysisResult(analyzedStandup);
            toast.success("AI Analysis Complete!");
            form.reset();
            setFile(null);
            fetchHistory();
        } catch (error: any) {
            console.error("Submission error:", error);
            toast.error(error.response?.data?.error || "Failed to submit standup.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DashboardLayout title="Standups">
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Submission Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Results Panel */}
                    {analysisResult && (
                        <div ref={resultsRef}>
                            <Card className="border-primary/20 bg-primary/5 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
                                <CardHeader className="bg-primary/10 pb-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-xl flex items-center gap-2">
                                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                                                AI Analysis Result
                                            </CardTitle>
                                            <CardDescription>Standup processed and analyzed successfully</CardDescription>
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={() => setAnalysisResult(null)}>Dismiss</Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-3">
                                            <h4 className="flex items-center gap-2 font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                                                <ClipboardList className="w-4 h-4" />
                                                Completed
                                            </h4>
                                            <div className="space-y-2">
                                                {analysisResult.completed_tasks?.length > 0 ? (
                                                    analysisResult.completed_tasks.map((task: string, i: number) => (
                                                        <div key={i} className="flex gap-2 text-sm p-2 rounded bg-background border shadow-sm">
                                                            <span className="text-green-500 font-bold">•</span>
                                                            {task}
                                                        </div>
                                                    ))
                                                ) : <p className="text-xs text-muted-foreground italic">No tasks marked as completed.</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="flex items-center gap-2 font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                                                <ListTodo className="w-4 h-4" />
                                                In Progress / Planned
                                            </h4>
                                            <div className="space-y-2">
                                                {[...(analysisResult.in_progress_tasks || []), ...(analysisResult.planned_tasks || [])].length > 0 ? (
                                                    [...(analysisResult.in_progress_tasks || []), ...(analysisResult.planned_tasks || [])].map((task: string, i: number) => (
                                                        <div key={i} className="flex gap-2 text-sm p-2 rounded bg-background border shadow-sm">
                                                            <span className="text-blue-500 font-bold">•</span>
                                                            {task}
                                                        </div>
                                                    ))
                                                ) : <p className="text-xs text-muted-foreground italic">No ongoing tasks detected.</p>}
                                            </div>
                                        </div>

                                        {analysisResult.blockers?.length > 0 && (
                                            <div className="md:col-span-2">
                                                <Alert variant="destructive" className="bg-destructive/5 border-destructive/20">
                                                    <AlertCircle className="h-4 w-4" />
                                                    <AlertTitle className="font-bold">Blockers Identified</AlertTitle>
                                                    <AlertDescription>
                                                        <ul className="mt-2 list-disc list-inside space-y-1">
                                                            {analysisResult.blockers.map((blocker: string, i: number) => (
                                                                <li key={i} className="text-sm font-medium">{blocker}</li>
                                                            ))}
                                                        </ul>
                                                    </AlertDescription>
                                                </Alert>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Plus className="w-5 h-5 text-primary" />
                                    Submit Standup
                                </div>
                                {file && <Badge variant="secondary" className="font-normal capitalize">{file.name}</Badge>}
                            </CardTitle>
                            <CardDescription>
                                Upload a transcript file or type your daily update manually.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="text" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-6">
                                    <TabsTrigger value="text" className="flex items-center gap-2">
                                        <Type className="w-4 h-4" />
                                        Manual Input
                                    </TabsTrigger>
                                    <TabsTrigger value="file" className="flex items-center gap-2">
                                        <FileUp className="w-4 h-4" />
                                        File Upload
                                    </TabsTrigger>
                                </TabsList>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <TabsContent value="text" className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="content">Your Daily Logs</Label>
                                            <Textarea
                                                id="content"
                                                placeholder="Yesterday I finished the API integration. Today I'm working on the frontend dashboards. No blockers currently."
                                                className="min-h-[150px] resize-none focus-visible:ring-primary"
                                                {...form.register("content")}
                                            />
                                            {form.formState.errors.content && (
                                                <p className="text-xs text-destructive font-medium">{form.formState.errors.content.message}</p>
                                            )}
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="file" className="space-y-4">
                                        <div
                                            className={`border-2 border-dashed rounded-xl p-8 transition-colors flex flex-col items-center justify-center text-center space-y-4 ${file ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-primary/50'
                                                }`}
                                        >
                                            <div className={`p-4 rounded-full ${file ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                                <FileUp className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{file ? file.name : 'Select or drop your transcript'}</p>
                                                <p className="text-xs text-muted-foreground mt-1">Supports .txt and .vtt files</p>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                id="transcript-upload"
                                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                            />
                                            <Button
                                                type="button"
                                                variant={file ? "outline" : "secondary"}
                                                onClick={() => document.getElementById("transcript-upload")?.click()}
                                            >
                                                {file ? "Change File" : "Choose File"}
                                            </Button>
                                        </div>
                                    </TabsContent>

                                    <div className="flex justify-end pt-2">
                                        <Button type="submit" disabled={isLoading} size="lg" className="px-8">
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                                    AI is Analyzing...
                                                </>
                                            ) : "Submit & Analyze"}
                                        </Button>
                                    </div>
                                </form>
                            </Tabs>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <History className="w-5 h-5 text-primary" />
                                Recent History
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isFetching ? (
                                <div className="flex justify-center p-8">
                                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                                </div>
                            ) : history.length === 0 ? (
                                <div className="text-center p-8 text-muted-foreground">
                                    No standups submitted yet.
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {history.map((item) => (
                                        <div key={item.id} className="p-4 rounded-xl border bg-muted/20 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(item.created_at).toLocaleString()}
                                                </div>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${item.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                            <p className="text-sm whitespace-pre-wrap">{item.content}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Info/Help */}
                <div className="space-y-6">
                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-lg">How it works</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-balance leading-relaxed space-y-4">
                            <p>Once you submit your standup, our <strong>AI Analysis System</strong> processes it instantly.</p>
                            <p>The system automatically extracts key components:</p>
                            <ul className="list-disc list-inside space-y-1 ml-2 marker:text-primary">
                                <li>Identify rolling tasks</li>
                                <li>Detect blockers</li>
                                <li>Summarize progress</li>
                            </ul>
                            <p>The results will appear on your <Link to="/reports" className="text-primary hover:underline font-semibold">Reports</Link> page.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Standups;
