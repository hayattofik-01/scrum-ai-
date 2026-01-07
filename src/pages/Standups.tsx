import { useState, useEffect } from "react";
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
import { Loader2, Plus, History, Clock } from "lucide-react";

const standupSchema = z.object({
    content: z.string().min(10, "Standup must be at least 10 characters.").max(1000, "Standup is too long."),
});

type StandupValues = z.infer<typeof standupSchema>;

const Standups = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<any[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    const form = useForm<StandupValues>({
        resolver: zodResolver(standupSchema),
        defaultValues: {
            content: "",
        },
    });

    const fetchHistory = async () => {
        try {
            const response = await api.get("/standups");
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
        try {
            await api.post("/standups", {
                content: data.content,
            });

            toast.success("Standup submitted successfully!");
            form.reset();
            fetchHistory(); // Refresh history
        } catch (error: any) {
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
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="w-5 h-5 text-primary" />
                                New Standup
                            </CardTitle>
                            <CardDescription>
                                Share your progress: what did you do, what are you doing next, and any blockers.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="content">Your Update</Label>
                                    <Textarea
                                        id="content"
                                        placeholder="Yesterday I finished the API integration. Today I'm working on the frontend dashboards. No blockers currently."
                                        className="min-h-[150px] resize-none"
                                        {...form.register("content")}
                                    />
                                    {form.formState.errors.content && (
                                        <p className="text-xs text-destructive">{form.formState.errors.content.message}</p>
                                    )}
                                </div>
                                <div className="flex justify-end">
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Submit Standup"}
                                    </Button>
                                </div>
                            </form>
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
                            <p>Once you submit your standup, our <strong>Distributed AI System</strong> picks it up instantly.</p>
                            <p>A background worker uses <strong>GPT-4o</strong> to extract key components:</p>
                            <ul className="list-disc list-inside space-y-1 ml-2 marker:text-primary">
                                <li>Identify rolling tasks</li>
                                <li>Detect blockers</li>
                                <li>Summarize progress</li>
                            </ul>
                            <p>The results will appear on your <Link to="/reports" className="text-primary hover:underline font-semibold">Reports</Link> page in a few seconds.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Standups;
