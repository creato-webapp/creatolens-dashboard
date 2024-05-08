import type { NextApiRequest, NextApiResponse } from 'next';
import MetaInstance from '@api/axiosInstance/Meta';

export default async function dashboardPostPicQueryHandler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { shortcode },
    } = req;

    try {
        const response = await MetaInstance.get(`/posts/pic?`, {
            responseType: 'arraybuffer', // Ensure the image data is treated as binary data
            headers: {
                Cookie: req.headers.cookie,
            },
            params: {
                shortcode: shortcode, // Assuming you need the profile ID as a query parameter
            },
        });

        res.setHeader('Content-Type', 'image/jpeg'); // Set the correct content type
        res.status(response.status);
        return res.end(response.data); // Send the image data directly without converting to JSON
    } catch (error) {
        console.error('Failed to fetch image:', error);
        res.status(500).json({ error: 'Failed to fetch image' });
    }
}
