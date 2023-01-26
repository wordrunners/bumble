import type { RequestHandler } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import authChecker from './authChecker'
import { 
  BOARDS_ROUTE,
  ADD_BOARD_ROUTE,
  GET_BOARDS_ROUTE,
  ADD_COMMENT_ROUTE,
  GET_COMMENTS_ROUTE,
  ADD_LIKE_ROUTE,
  GET_LIKES_ROUTE,  
} from '../Router/routes'

const backendAPIs = [
  BOARDS_ROUTE + ADD_BOARD_ROUTE,
  BOARDS_ROUTE + GET_BOARDS_ROUTE,
  BOARDS_ROUTE + ADD_COMMENT_ROUTE,
  BOARDS_ROUTE + GET_COMMENTS_ROUTE,
  BOARDS_ROUTE + ADD_LIKE_ROUTE,
  BOARDS_ROUTE + GET_LIKES_ROUTE
]

const proxy: RequestHandler =  async (req, res, next) => {

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
  
  
  return createProxyMiddleware({
    target: 'https://ya-praktikum.tech/api/v2',
    pathRewrite: { '^/api': '' }, 
    changeOrigin: true,
    cookieDomainRewrite: { 'ya-praktikum.tech': req.hostname },
  })(req, res, next);
};

export default proxy
