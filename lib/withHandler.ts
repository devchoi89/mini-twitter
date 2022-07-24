import { NextApiRequest, NextApiResponse } from "next";

interface ConfigType {
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  methods: method[];
  isPrivate?: boolean;
}

type method = "POST" | "GET" | "DELETE";

export default function withHandler({
  handler,
  methods,
  isPrivate = true,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(400).json({ ok: false, message: "잘못된 요청입니다." });
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, message: "로그인 해 주세요." });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
