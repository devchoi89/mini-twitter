import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { withApiSession } from "../../../lib/withSession";

async function HomeTweets(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
  } = req;
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
            userId: user?.id,
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

export default withApiSession(HomeTweets);
