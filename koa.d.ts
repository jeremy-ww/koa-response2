import Koa, { ExtendableContext } from 'koa'

declare module 'koa' {
  type KoaReponseType =
    | 'continue'
    | 'switchingProtocols'
    | 'processing'
    | 'oK'
    | 'created'
    | 'accepted'
    | 'nonAuthoritativeInformation'
    | 'noContent'
    | 'resetContent'
    | 'partialContent'
    | 'multiStatus'
    | 'alreadyReported'
    | 'iMUsed'
    | 'multipleChoices'
    | 'movedPermanently'
    | 'found'
    | 'seeOther'
    | 'notModified'
    | 'useProxy'
    | 'temporaryRedirect'
    | 'permanentRedirect'
    | 'badRequest'
    | 'unauthorized'
    | 'paymentRequired'
    | 'forbidden'
    | 'notFound'
    | 'methodNotAllowed'
    | 'notAcceptable'
    | 'proxyAuthenticationRequired'
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
    | 'mATeapot'
    | 'misdirectedRequest'
    | 'unprocessableEntity'
    | 'locked'
    | 'failedDependency'
    | 'upgradeRequired'
    | 'preconditionRequired'
    | 'tooManyRequests'
    | 'requestHeaderFieldsTooLarge'
    | 'connectionClosedWithoutResponse'
    | 'unavailableForLegalReasons'
    | 'clientClosedRequest'
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

  interface ExtendableContext
    extends Record<KoaReponseType, (payload?: any, message?: string) => void> {

    /**
     * @param {number} status HTTP status code
     * @param {any} payload Response
     * @param {string} message Custom message
     */
    send(status: number, payload?: any, message?: string): void
  }
}
