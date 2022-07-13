import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { withApiSession } from "../../../lib/withSession";

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

export default withApiSession(profile);
