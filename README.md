# koa-response2 [![minified + gzip](https://flat.badgen.net/bundlephobia/minzip/koa-response2)](https://bundlephobia.com/result?p=koa-response2) [![npm package](https://flat.badgen.net/npm/v/koa-response2)](https://www.npmjs.com/package/koa-response2)

<img src="https://i.imgur.com/tlrSYYr.png" />

Inspired by [koa-respond](https://github.com/jeffijoe/koa-respond).

## Install

```bash
$ yarn add koa-response2
```

## Usage

```typescript
import Koa, { ParameterizedContext } from 'koa'
import koaReponse from 'koa-response2'

const app = new Koa()

app.use(koaReponse())

export default function (ctx: ParameterizedContext) {
  ctx.oK({ id: 123, name: 'Dat Boi' })  // HTTP Code: 200, Response: { id: 123, name: 'Dat Boi' }
  ctx.notFound('Not found, boii')       // HTTP Code: 404, Response: 'Not found, boii'
  ctx.internalServerError('error')      // HTTP Code: 500, Response: 'error'
  ctx.send(200, { name: 'tom' }, 'success')
}
```

## Options

```typescript
export interface KoaResponse {
  statusMap?: Record<string, number>
  format?: (status: number, payload?: any, message?: string) => any
}
```

### statusMap

- **Type**: `Object`
- **Required**: `false`

Override built-in HTTP status map, e.g.: 

```typescript
import Koa, { ParameterizedContext } from 'koa'
import koaReponse from 'koa-response2'

const app = new Koa()

app.use(koaReponse({
  statusMap: {
    whatever: 999
  }
}))
```

For better typing experience, you should [override declaration file like this](https://github.com/Army-U/koa-response2/blob/develop/koa.d.ts).

### format

- **Type**: `Function`
- **Required**: `false`

Modify HTTP response globally, e.g.:

```typescript
import Koa, { ParameterizedContext } from 'koa'
import koaReponse from 'koa-response2'

const app = new Koa()

// This will wrap all reponse with { code: number, data: T: message?: string } construct.
app.use(koaReponse({
  format (status, payload, message = '') {
    return {
      code: status,
      data: payload,
      message
    }
  }
}))
```

## Availble Context API

`koa-response2` add bulk APIs on koa.Context, you can see the whole list below.

<details>

<pre>
export const STATUS_MAP = {
  continue: 100,
  switchingProtocols: 101,
  processing: 102,

  oK: 200,
  created: 201,
  accepted: 202,
  nonAuthoritativeInformation: 203,
  noContent: 204,
  resetContent: 205,
  partialContent: 206,
  multiStatus: 207,
  alreadyReported: 208,
  iMUsed: 226,

  multipleChoices: 300,
  movedPermanently: 301,
  found: 302,
  seeOther: 303,
  notModified: 304,
  useProxy: 305,
  temporaryRedirect: 307,
  permanentRedirect: 308,

  badRequest: 400,
  unauthorized: 401,
  paymentRequired: 402,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  notAcceptable: 406,
  proxyAuthenticationRequired: 407,
  requestTimeout: 408,
  conflict: 409,
  gone: 410,
  lengthRequired: 411,
  preconditionFailed: 412,
  payloadTooLarge: 413,
  requestURITooLong: 414,
  unsupportedMediaType: 415,
  requestedRangeNotSatisfiable: 416,
  expectationFailed: 417,
  mATeapot: 418,
  misdirectedRequest: 421,
  unprocessableEntity: 422,
  locked: 423,
  failedDependency: 424,
  upgradeRequired: 426,
  preconditionRequired: 428,
  tooManyRequests: 429,
  requestHeaderFieldsTooLarge: 431,
  connectionClosedWithoutResponse: 444,
  unavailableForLegalReasons: 451,
  clientClosedRequest: 499,

  internalServerError: 500,
  notImplemented: 501,
  badGateway: 502,
  serviceUnavailable: 503,
  gatewayTimeout: 504,
  hTTPVersionNotSupported: 505,
  variantAlsoNegotiates: 506,
  insufficientStorage: 507,
  loopDetected: 508,
  notExtended: 510,
  networkAuthenticationRequired: 511,
  networkConnectTimeoutError: 599
}
</pre>
</details>

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2019-present, Army-U
