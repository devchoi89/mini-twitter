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

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
