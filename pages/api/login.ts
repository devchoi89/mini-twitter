import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
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

async function Enter(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;

  if (!email) return res.status(400).json({ ok: false });

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return res.status(404).json({ ok: false });
  req.session.user = {
    id: user.id,
    userId: user.userId,
    email: user.email,
  };
  await req.session.save();
  return res.json({
    ok: true,
    email: req.session.user.email,
  });
}

export default withIronSessionApiRoute(Enter, cookieOptions);
