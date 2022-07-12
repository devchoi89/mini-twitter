import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { withIronSessionApiRoute } from "iron-session/next";

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

async function Write(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { tweet },
    session: { user },
  } = req;
  const post = await db.tweet.create({
    data: {
      tweet,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  console.log(post);
  res.json({
    ok: true,
    post,
  });
}

export default withIronSessionApiRoute(Write, cookieOptions);
