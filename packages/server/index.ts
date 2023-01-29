import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite';
dotenv.config()

import express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import { createClientAndConnect } from './db';
import { router } from './src/Router'
import { cookieParser, yaProxy } from './src/middlewares';
import { CLIENT_YA_API } from './src/data';

const port = Number(process.env.SERVER_PORT) || 5000

async function createServer(isDev = process.env.NODE_ENV === 'development') {
  await createClientAndConnect();
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))


  let template: string;
  let vite: ViteDevServer
  let render: (url: string) => string
  let store: any

  if (!isDev) {
    const distPath = path.dirname(require.resolve('client/dist/index.html'))
    const ssrClientPath = require.resolve('client/ssr-dist/ssr.cjs')

    template = fs.readFileSync(
      path.resolve(distPath, 'index.html'),
      'utf-8',
    )

    render = (await import(ssrClientPath)).render
    store = (await import(ssrClientPath)).store

    app.use('/assets', express.static(path.resolve(distPath, 'assets'),{
      index: false,
    }))
  } else {
    const srcPath = path.dirname(require.resolve('client'))

    template = fs.readFileSync(
      path.resolve(srcPath, 'index.html'),
      'utf-8',
    )

    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom'
    })

    render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'src/ssr.tsx'))).render;
    store = (await vite!.ssrLoadModule(path.resolve(srcPath, 'src/ssr.tsx'))).store;
  
    app.use(vite.middlewares)
    app.use(cors())
  }
  
  app.use(cookieParser);
  app.use(router);
  app.disable('x-powered-by').enable('trust proxy')
  app.use(CLIENT_YA_API, yaProxy)

 
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    const appHtml = render(url)
    
    try {
      const state = store.getState()

      if (isDev) {
        template = await vite.transformIndexHtml(url, template)
      }

      const preloadedState = `<script>window.__PRELOADED_STATE__  = 
        ${JSON.stringify( state )}
      </script>`

      const html = template.replace(`<!--ssr-outlet-->`, appHtml + preloadedState)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev) {
        vite!.ssrFixStacktrace(e as Error)
      }
    next(e)
    }
  })

  return { app }
}

createServer().then(({ app }) => app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  }))
