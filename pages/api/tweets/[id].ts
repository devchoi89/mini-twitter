import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { withApiSession } from "../../../lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
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
          badge: true,
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
          badge: true,
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
        select: {
          userId: true,
        },
      },
    },
  });
  const isTweetLiked = Boolean(
    await db.fav.findFirst({
      where: {
        tweetId: +id.toString(),
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  res.json({
    ok: true,
    replies,
    tweet,
    isTweetLiked,
  });
}

export default withApiSession(handler);
