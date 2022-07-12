import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;
  const tweet = await db.tweet.findUnique({
    where: {
      id: +id.toString(),
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
    },
  });
  const replies = await db.tweet.findMany({
    where: {
      parentId: +id.toString(),
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
    },
  });
  res.json({
    ok: true,
    replies,
    tweet,
  });
}

export default handler;
