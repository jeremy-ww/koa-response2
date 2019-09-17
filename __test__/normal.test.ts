import axios from 'axios'
import Router from 'koa-router'
import { Server } from 'http'
import Koa, { ParameterizedContext } from 'koa'

import KoaResponse from '../'

const fetch = axios.create({
  baseURL: 'http://127.0.0.1:3000'
})

let app: Koa
let http: Server

beforeAll(function() {
  return new Promise(async resolve => {
    app = new Koa()

    const router = new Router()

    app.use(KoaResponse())

    router.get('/200', (ctx: ParameterizedContext) => {
      ctx.oK('{ code: 200 }')
    })

    router.get('/204', (ctx: ParameterizedContext) => {
      // @ts-ignore
      ctx.noContent('noContent')
    })

    router.get('/404', (ctx: ParameterizedContext) => {
      ctx.notFound({ code: 404, message: 'Not found', data: {} })
    })

    router.get('/500', (ctx: ParameterizedContext) => {
      ctx.internalServerError({ numberic: 12345678 })
    })

    router.get('/502', (ctx: ParameterizedContext) => {
      ctx.badGateway('')
    })

    app.use(router.routes()).use(router.allowedMethods())

    http = app.listen(3000, function() {
      resolve()
    })
  })
})

afterAll(function() {
  http.close()
})

test('200', async () => {
  const { status, data } = await fetch.get('/200')
  expect(status).toBe(200)
  expect(data).toBe('{ code: 200 }')
})

test('204', async () => {
  const { status, data } = await fetch.get('/204')
  expect(status).toBe(204)
  expect(data).toBe('')
})

test('404', async () => {
  try {
    await fetch.get('/404')
  } catch (e) {
    expect(e.response.status).toBe(404)
    expect(e.response.data).toEqual({
      code: 404,
      message: 'Not found',
      data: {}
    })
  }
})

test('500', async () => {
  try {
    await fetch.get('/500')
  } catch (e) {
    expect(e.response.status).toBe(500)
    expect(e.response.data).toEqual({ numberic: 12345678 })
  }
})

test('502', async () => {
  try {
    console.log(await fetch.get('/502'))
  } catch (e) {
    expect(e.response.status).toBe(502)
    expect(e.response.data).toBe('')
  }
})
