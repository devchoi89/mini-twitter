import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";

export default async function Create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, userId, email } = req.body;

  if (!name || !email || !userId) return res.status(400).json({ ok: false });

  try {
    const user = await db.user.upsert({
      where: {
        email,
      },
      create: {
        name,
        userId,
        email,
      },
      update: {},
    });
    return res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, message: "중복된 아이디입니다." });
  }
}
