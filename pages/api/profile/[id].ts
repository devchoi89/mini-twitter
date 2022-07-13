import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { withApiSession } from "../../../lib/withSession";

async function profile(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
    query: { id },
  } = req;

  if (!id) return res.status(400).json({ ok: false });

  const findUser = await db.user.findUnique({
    where: { userId: id.toString() },
    select: {
      id: true,
      userId: true,
      name: true,
      createAt: true,
    },
  });

  if (!findUser) return res.status(404).json({ ok: false });

  const tweets = await db.tweet.findMany({
    where: { userId: findUser?.id, parentId: null },
    include: {
      user: true,
      _count: {
        select: {
          favs: true,
          answers: true,
        },
      },
      favs: {
        where: {
          userId: user?.id,
        },
        select: {
          userId: true,
        },
      },
    },
  });
  return res.json({
    ok: true,
    tweets,
    findUser,
  });
}

export default withApiSession(profile);
