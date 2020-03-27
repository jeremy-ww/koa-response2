import Koa, { ParameterizedContext } from 'koa'
import koaReponse from 'koa-response2'

const app = new Koa()

app.use(koaReponse())

export default function(ctx: ParameterizedContext) {
  ctx.oK({ id: 123, name: 'Dat Boi' }) // HTTP Code: 200, Response: { id: 123, name: 'Dat Boi' }
  ctx.notFound('Not found, boii') // HTTP Code: 404, Response: 'Not found, boii'
  ctx.internalServerError('error') // HTTP Code: 500, Response: 'error'
  ctx.send(200, { name: 'tom' }, 'success')
}
