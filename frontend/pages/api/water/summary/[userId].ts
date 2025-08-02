import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { userId } = req.query;

    if (req.method === 'GET') {
        try {
            const backendResponse = await fetch(
                `http://localhost:3000/water/summary/${userId}`, // NestJS backend URL
            );

            const data = await backendResponse.json();
            res.status(backendResponse.status).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end('Method Not Allowed');
    }
}