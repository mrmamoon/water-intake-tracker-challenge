import { useState } from 'react';

interface WaterFormProps {
    onSubmit: (data: { date: string; intakeMl: number }) => void;
}

export default function WaterForm({ onSubmit }: WaterFormProps) {
    const [date, setDate] = useState('');
    const [intakeMl, setIntakeMl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate input
        if (!date) {
            setError('Date is required');
            return;
        }

        const intakeValue = parseInt(intakeMl);
        if (isNaN(intakeValue)) {
            setError('Intake must be a number');
            return;
        }

        if (intakeValue <= 0) {
            setError('Intake must be positive');
            return;
        }

        setError('');
        onSubmit({ date, intakeMl: intakeValue });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-1">Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div>
                <label className="block mb-1">Intake (ml)</label>
                <input
                    type="number"
                    min="1"
                    value={intakeMl}
                    onChange={(e) => setIntakeMl(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
                Submit
            </button>
        </form>
    );
}