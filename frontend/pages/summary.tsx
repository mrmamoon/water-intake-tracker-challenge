import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ReferenceLine } from 'recharts';

interface SummaryData {
    date: string;
    totalIntake: number;
    percentageOfGoal: number;
}

export default function SummaryPage() {
    const [data, setData] = useState<SummaryData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/water/summary/current-user'); // Replace with actual user ID
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Weekly Water Intake</h1>

            {loading ? (
                <p>Loading...</p>
            ) : data.length > 0 ? (
                <div className="bg-white p-4 rounded shadow">
                    <BarChart width={730} height={300} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis label={{ value: 'ml', angle: -90, position: 'insideLeft' }} />
                        <ReferenceLine y={2000} stroke="red" strokeDasharray="3 3" />
                        <Bar dataKey="totalIntake" fill="#8884d8" />
                    </BarChart>
                    <div className="mt-4 text-center">
                        <div className="flex items-center justify-center">
                            <div className="w-4 h-4 bg-red-500 mr-2"></div>
                            <span>Daily Goal (2,000 ml)</span>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
}