import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
import { withApiSession } from "../../lib/withSession";

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

export default withApiSession(Enter);
