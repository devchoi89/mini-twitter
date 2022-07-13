import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../lib/withSession";

async function Out(req: NextApiRequest, res: NextApiResponse) {
  await req.session.destroy();
  return res.json({
    ok: true,
    message: "로그아웃 되었습니다.",
  });
}

export default withApiSession(Out);
