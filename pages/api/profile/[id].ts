// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';
import { singleUserQuery,userCreatedPostsQuery,userLikedPostsQuery } from '../../../utils/queries';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === 'GET') {

        const { id } = req.query;

        const userquery = singleUserQuery(id);
        const userVideoQuery = userCreatedPostsQuery(id);
        const userlikeQuery = userLikedPostsQuery(id);

        const user = await client.fetch(userquery);
        const userVideo = await client.fetch(userVideoQuery);
        const userLike = await client.fetch(userlikeQuery);

        res.status(200).json({ user: user[0], userVideo, userLike});
    }
}
