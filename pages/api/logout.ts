import { NextApiRequest, NextApiResponse } from "next";
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

async function Out(req: NextApiRequest, res: NextApiResponse) {
  await req.session.destroy();
  return res.json({
    ok: true,
    message: "로그아웃 되었습니다.",
  });
}

export default withIronSessionApiRoute(Out, cookieOptions);
