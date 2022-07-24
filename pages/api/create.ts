import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
import withHandler from "../../lib/withHandler";

async function Create(req: NextApiRequest, res: NextApiResponse) {
  const { name, userId, email } = req.body;

  if (!name || !email || !userId) return res.status(400).json({ ok: false });

  const user = await db.user.upsert({
    where: {
      email,
    },
    create: {
      name,
      userId,
      email,
      badge:
        "https://img.danawa.com/prod_img/500000/126/615/img/14615126_1.jpg",
      banner:
        "https://blog.kakaocdn.net/dn/b9LGuJ/btqTowTZVQB/DsCtwwKtpav5Bu8uC6jKXk/img.jpg",
      intro: "춘식입니다. (기본 소개글)",
    },
    update: {},
  });
  return res.json({
    ok: true,
  });
}

export default withHandler({
  handler: Create,
  methods: ["POST"],
  isPrivate: false,
});
