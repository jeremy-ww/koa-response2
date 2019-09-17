/// <reference path="./koa.d.ts" />
import { ParameterizedContext } from 'koa'

const STATUS_MAP_WITH_BODY = {
  oK: 200,
  created: 201,
  accepted: 202,
  nonAuthoritativeInformation: 203,
  partialContent: 206,

  multipleChoices: 300,

  badRequest: 400,
  paymentRequired: 402,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  notAcceptable: 406,
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
  imATeapot: 418,
  misdirectedRequest: 421,
  unprocessableEntity: 422,
  locked: 423,
  failedDependency: 424,
  upgradeRequired: 426,
  preconditionRequired: 428,
  tooManyRequests: 429,
  requestHeaderFieldsTooLarge: 431,
  unavailableForLegalReasons: 451,

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

const STATUS_MAP_WITHOUT_BODY = {
  continue: 100,
  switchingProtocols: 101,
  processing: 102,

  noContent: 204,
  resetContent: 205,

  // These status code belongs to `ctx.redirect`.
  // movedPermanently: 301,
  // found: 302,
  // seeOther: 303,
  // notModified: 304,
  // useProxy: 305,
  // temporaryRedirect: 307,
  // permanentRedirect: 308,

  unauthorized: 401,
  proxyAuthenticationRequired: 407
}

const STATUS_MAP = Object.assign(
  {},
  STATUS_MAP_WITH_BODY,
  STATUS_MAP_WITHOUT_BODY
)

export interface KoaResponse {
  statusMap?: Record<string, number>
  format?: (status: number, payload?: any, message?: string) => any
}

export default function(params: KoaResponse = {}) {
  const statusMap = Object.assign({}, STATUS_MAP, params.statusMap || {})
  const { format } = params

  const formatFunction = format
    ? (status: number, payload?: any, message?: string) => {
        return format(status, payload, message)
      }
    : (status: number, payload?: any) => payload

  return function(ctx: ParameterizedContext, next: Function) {
    for (const key in statusMap) {
      ctx[key] = function(payload?: any, message?: string) {
        const status = statusMap[key]
        ctx.status = status
        ctx.body = formatFunction(status, payload, message)
      }
    }

    ctx.send = function(status: number, payload?: any, message?: string) {
      ctx.status = status
      ctx.body = formatFunction(status, payload, message)
    }

    return next()
  }
}
