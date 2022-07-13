import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
import { withApiSession } from "../../lib/withSession";

async function Likes(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: tweetId,
    session: { user },
  } = req;

  const tweet = await db.tweet.findUnique({
    where: {
      id: +tweetId.toString(),
    },
    select: {
      id: true,
    },
  });
  if (!tweet) res.status(404).json({ ok: false, error: "Not found page" });
  const alreadyExists = await db.fav.findFirst({
    where: {
      userId: user?.id,
      tweetId: +tweetId.toString(),
    },
    select: {
      id: true,
    },
  });
  if (alreadyExists) {
    await db.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await db.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        tweet: {
          connect: {
            id: +tweetId.toString(),
          },
        },
      },
    });
  }
  res.json({
    ok: true,
  });
}

export default withApiSession(Likes);
