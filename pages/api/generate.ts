import { db, shortLink } from '@/lib/index';
import type { NextApiRequest, NextApiResponse } from 'next'
import { isWebUri } from 'valid-url';


type RequestData = {
  url: string
};

 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const  {method} = req;

  if(method !== "POST") {
    return res.status(400).json({
      message: "Only POST requests are allowed."
    });
  }

  const {url}: RequestData = JSON.parse(JSON.stringify(req.body));
  const host = req.headers.host;
  const{shortCode, shortUrl} = shortLink(host!);

  if(!isWebUri(url)) {
    return res.status(400).json({
      statusCode: 400,
      error: {
        message: "Invalid Url"
      },
      data: null
    });
  }

  const result = await db.$transaction(async (tx) => {
    // # query if there is an existing original url
    const originalUrl = await tx.url.findFirst({
      where: {
        longUrl: url,
      },
    });

    if (originalUrl) return originalUrl;

    // # create a new url
    const newUrl = await tx.url.create({
      data: {
        longUrl: url,
        shortUrl,
        urlCode: shortCode,
      },
    });

    // # create new analytic
    await tx.analytics.create({
      data: {
        clicked: 0,
        url: {
          connect: {
            id: newUrl.id,
          },
        },
      },
    });

    return newUrl;
  });
  return res.status(200).json({
    statusCode: 200,
    error: null,
    data: {
      longUrl: result.longUrl,
      shortUrl: result.shortUrl,
      urlCode: result.urlCode,
    },
  });
}