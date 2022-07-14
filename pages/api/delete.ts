import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
import { withApiSession } from "../../lib/withSession";

async function Delete(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: tweetId,
    session: { user },
  } = req;
  if (!user)
    return res.status(401).json({ ok: false, message: "로그인해 주세요." });
  if (!tweetId)
    return res.status(400).json({ ok: false, message: "잘못된 요청입니다." });

  const match = Boolean(
    await db.tweet.findFirst({
      where: {
        id: tweetId,
        userId: user?.id,
      },
    })
  );
  if (!match)
    return res
      .status(404)
      .json({ ok: false, message: "지우려는 트윗이 없습니다." });

  await db.tweet.delete({
    where: {
      id: tweetId,
    },
  });
  return res.json({
    ok: true,
  });
}

export default withApiSession(Delete);
