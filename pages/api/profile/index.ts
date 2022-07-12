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

async function profile(req: NextApiRequest, res: NextApiResponse) {
  if (!req.session.user) return res.status(400).json({ ok: false });
  const profile = await db.user.findUnique({
    where: { email: req.session.user?.email },
  });
  return res.json({
    ok: true,
    profile,
  });
}

export default withIronSessionApiRoute(profile, cookieOptions);
