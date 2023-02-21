import type { RequestHandler } from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware'
import { YANDEX_API } from '../data'

export const proxy: RequestHandler =  async (req, res, next) => 
  createProxyMiddleware({
    target: YANDEX_API,
    pathRewrite: { '^/api': '' }, 
    changeOrigin: true,
    cookieDomainRewrite: { 'ya-praktikum.tech': req.hostname },
    logLevel: 'info',
    selfHandleResponse: false,
    onProxyReq: fixRequestBody,
  })(req, res, next);

