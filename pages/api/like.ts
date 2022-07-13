import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import db from "../../lib/db";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
      userId: string;
      email: string;
    };
  }
}

const cookieOptions = {
  cookieName: "LogInSession",
  password: "u^Yv/ZK>,H>9^GJ{s@N+5aT!w2B4=~QX_9r1=;eq",
};

async function Likes(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: tweetId,
    session: { user },
  } = req;
  console.log(tweetId);
  console.log(user);

  const tweet = await db.tweet.findUnique({
    where: {
      //id가 배열일 수 있으므로 toString()
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

export default withIronSessionApiRoute(Likes, cookieOptions);
