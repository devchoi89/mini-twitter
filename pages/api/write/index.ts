import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { withApiSession } from "../../../lib/withSession";

async function Write(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { tweet, image },
    session: { user },
  } = req;

  const post = await db.tweet.create({
    data: {
      tweet,
      image,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({
    ok: true,
    post,
  });
}

export default withApiSession(Write);
