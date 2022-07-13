import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const tweets = await db.tweet.findMany({
      where: {
        parentId: null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            userId: true,
          },
        },
        _count: {
          select: {
            favs: true,
            answers: true,
          },
        },
        favs: {
          where: {
            userId: 1,
          },
          include: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
    res.json({
      ok: true,
      tweets,
    });
  }
}

export default handler;
