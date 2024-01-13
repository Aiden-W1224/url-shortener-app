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

    const {code} = req.query;
    if (typeof code == "string") {
        const analytics = await db.analytics.findFirst({
          where: {
            url: {
              urlCode: code,
            },
          },
          include: {
            url: true,
          },
        });
    
        if (!analytics) {
          return res.status(400).json({
            statusCode: 400,
            error: {
              message: "Analytic not found!",
            },
            data: null,
          });
        }
    
        return res.status(200).json({
          statusCode: 200,
          error: null,
          data: {
            clicked: analytics.clicked,
            url: {
              originalUrl: analytics.url.longUrl,
              shortUrl: analytics.url.shortUrl,
              urlCode: analytics.url.urlCode,
            },
          },
        });
      }
    }