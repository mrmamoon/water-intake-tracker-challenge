import { render, screen, fireEvent } from '@testing-library/react';
import WaterForm from '../components/WaterForm';
import '@testing-library/jest-dom';

jest.mock('../utils/api', () => ({
    logWater: jest.fn(),
}));

describe('WaterForm', () => {
    it('submits valid form data', async () => {
        const mockSubmit = jest.fn();
        render(<WaterForm onSubmit={mockSubmit} />);

        fireEvent.change(screen.getByLabelText(/date/i), {
            target: { value: '2023-01-01' }
        });

        fireEvent.change(screen.getByLabelText(/intake/i), {
            target: { value: '1500' }
        });

        fireEvent.click(screen.getByText(/submit/i));

        expect(mockSubmit).toHaveBeenCalledWith({
            date: '2023-01-01',
            intakeMl: 1500
        });
    });

    it('shows error with invalid input', () => {
        render(<WaterForm onSubmit={jest.fn()} />);

        fireEvent.change(screen.getByLabelText(/intake/i), {
            target: { value: '-100' }
        });

        fireEvent.click(screen.getByText(/submit/i));

        expect(screen.getByText(/must be positive/i)).toBeInTheDocument();
    });
});