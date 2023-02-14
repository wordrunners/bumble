import axios from 'axios'
import type { NextFunction, Request, Response } from 'express';
import { YANDEX_API_AUTH } from '../data'

import { 
  BOARDS_ROUTE,
  ADD_BOARD_ROUTE,
  GET_BOARDS_ROUTE,
  ADD_COMMENT_ROUTE,
  GET_COMMENTS_ROUTE,
  ADD_LIKE_ROUTE,
  GET_LIKES_BY_USER_ROUTE,
} from '../Router/routes'

const backendAPIs = [
  BOARDS_ROUTE + ADD_BOARD_ROUTE,
  BOARDS_ROUTE + GET_BOARDS_ROUTE,
  BOARDS_ROUTE + ADD_COMMENT_ROUTE,
  BOARDS_ROUTE + GET_COMMENTS_ROUTE,
  BOARDS_ROUTE + ADD_LIKE_ROUTE,
  BOARDS_ROUTE + GET_LIKES_BY_USER_ROUTE
]

export async function auth(req: Request, res: Response, next: NextFunction) {
  console.log(`The request method is ${req.method}`);
  if (backendAPIs.includes(req.originalUrl)) {
    if (req.headers.cookie) {
      if (await authChecker(req.headers.cookie)) {
        return next()
      } else 
        res.statusCode = 403;
        res.send('<!doctype html><p>Поддельная cookie</p>');
        return;
    } else {
      res.statusCode = 403;
      res.send('<!doctype html><p>Нет cookie</p>');
      return;
    }
  }
}

const authChecker = async(cookie: string) => {

  return await axios(YANDEX_API_AUTH, {
  
  headers: { 'Cookie': cookie}
  })
  .then(function (response) {
    if (response?.data?.id) {
      return true
    }
    else return false
  })
  .catch(function (error) {
    console.log(error);
    
    return false
  });
}
