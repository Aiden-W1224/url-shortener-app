import { db } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "GET") {
    return res.status(400).json({
      message: "Only GET request are allowed!",
    });
  }

  const { code } = req.query;

  if (typeof code == "string") {
    const result = await db.$transaction(async (tx) => {
      //user makes a get request on their short url -> if their code is invalid or not found
      const url = await tx.url.findUnique({
        where: {
          urlCode: code,
        },
      });

      //return null
      if (!url) return null;

      //url analytic
      await tx.analytics.update({
        where: {
          url_id: url.id,
        },
        data: {
          clicked: {
            increment: 1,
          },
        },
      });

      //only if a url code is valid and is found in our database
      return url;
    });

    if (!result) {
      return res.status(400).json({
        statusCode: 400,
        error: {
          message: "Invalid short url code!",
        },
        data: null,
      });
    }

    //redirect url
    return res.redirect(result.longUrl);
  }
}