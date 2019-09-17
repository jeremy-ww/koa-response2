import Koa, { ExtendableContext } from 'koa'

declare module 'koa' {
  type KoaReponseTypeWithBody =
    | 'oK'
    | 'created'
    | 'accepted'
    | 'nonAuthoritativeInformation'
    | 'partialContent'
    | 'multipleChoices'
    | 'badRequest'
    | 'unauthorized'
    | 'paymentRequired'
    | 'forbidden'
    | 'notFound'
    | 'methodNotAllowed'
    | 'notAcceptable'
    | 'requestTimeout'
    | 'conflict'
    | 'gone'
    | 'lengthRequired'
    | 'preconditionFailed'
    | 'payloadTooLarge'
    | 'requestURITooLong'
    | 'unsupportedMediaType'
    | 'requestedRangeNotSatisfiable'
    | 'expectationFailed'
    | 'imATeapot'
    | 'misdirectedRequest'
    | 'unprocessableEntity'
    | 'locked'
    | 'failedDependency'
    | 'upgradeRequired'
    | 'preconditionRequired'
    | 'tooManyRequests'
    | 'requestHeaderFieldsTooLarge'
    | 'unavailableForLegalReasons'
    | 'internalServerError'
    | 'notImplemented'
    | 'badGateway'
    | 'serviceUnavailable'
    | 'gatewayTimeout'
    | 'hTTPVersionNotSupported'
    | 'variantAlsoNegotiates'
    | 'insufficientStorage'
    | 'loopDetected'
    | 'notExtended'
    | 'networkAuthenticationRequired'
    | 'networkConnectTimeoutError'

  type KoaReponseTypeWithoutBody =
    | 'continue'
    | 'switchingProtocols'
    | 'processing'
    | 'noContent'
    | 'resetContent'
    | 'unauthorized'
    | 'proxyAuthenticationRequired'

  interface ExtendableContext
    extends Record<
        KoaReponseTypeWithBody,
        (payload?: any, message?: string) => void
      >,
      Record<KoaReponseTypeWithoutBody, () => void> {
    /**
     * @param {number} status HTTP status code
     * @param {any} payload Response
     * @param {string} message Custom message
     */
    send(status: number, payload?: any, message?: string): void
  }
}
