import axios from 'axios';
import type { NextFunction, Request, Response } from 'express';
import { YANDEX_API_AUTH } from '../data';

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const data = {
      authCookie: req.cookies.authCookie,
      uuid: req.cookies.uuid,
    };
    await axios.get(YANDEX_API_AUTH, {
      headers: { Cookie: 
        Object.entries(data)
          .map(([key, val]) => `${key}=${val}`)
          .join(';')
       },
    });
  } catch (err) {
    res.statusCode = 403
  }
  next();
}
