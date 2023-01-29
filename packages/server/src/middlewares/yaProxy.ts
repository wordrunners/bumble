;import type { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware'
import { YANDEX_API } from '../data';

export const yaProxy = 
  (req:Request, res:Response, next: NextFunction) => createProxyMiddleware({
    target: YANDEX_API,
    changeOrigin: true,
    pathRewrite: { '^/ya-api': '' },
    logLevel: 'info',
    cookieDomainRewrite: {'ya-praktikum.tech': req.hostname}, 
    selfHandleResponse: false,
    onProxyReq: fixRequestBody,
  })(req, res, next);
