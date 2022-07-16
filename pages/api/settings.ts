import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
import { withApiSession } from "../../lib/withSession";

async function ProfileUpdate(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { banner, badge, intro },
    session: { user },
  } = req;
  if (!user) return res.status(401).json({ ok: false });
  const updatedUser = await db.user.update({
    where: {
      id: user?.id,
    },
    data: {
      badge,
      banner,
      intro,
    },
  });
  console.log(updatedUser);
  if (!updatedUser) return res.status(500).json({ ok: false });
  res.json({
    ok: true,
  });
}

export default withApiSession(ProfileUpdate);
