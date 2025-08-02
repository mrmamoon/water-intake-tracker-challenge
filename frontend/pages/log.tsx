import { useState } from 'react';
import WaterForm from '../components/WaterForm';

export default function LogPage() {
    const [status, setStatus] = useState<null | 'success' | 'error'>(null);

    const handleSubmit = async (data: { date: string; intakeMl: number }) => {
        setStatus(null);

        try {
            const response = await fetch('/api/water/log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: 'current-user',
                    date: data.date,
                    intakeMl: data.intakeMl
                })
            });

            if (response.ok) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Log Water Intake</h1>
            <WaterForm onSubmit={handleSubmit} />
            {status === 'success' && (
                <p className="text-green-500 mt-4">Log saved successfully!</p>
            )}
            {status === 'error' && (
                <p className="text-red-500 mt-4">Error saving log. Please try again.</p>
            )}
        </div>
    );
}