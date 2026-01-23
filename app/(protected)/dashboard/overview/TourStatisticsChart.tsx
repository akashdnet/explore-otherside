"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ChartData {
    name: string;
    tours: number;
}

interface TourStatisticsChartProps {
    data: ChartData[];
}

export default function TourStatisticsChart({ data }: TourStatisticsChartProps) {
    return (
        <Card className="shadow-md border-none lg:col-span-2">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">Monthly Text Statistics</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{ fill: 'transparent' }}
                        />
                        <Bar
                            dataKey="tours"
                            fill="currentColor"
                            radius={[6, 6, 0, 0]}
                            className="fill-primary"
                            barSize={40}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
