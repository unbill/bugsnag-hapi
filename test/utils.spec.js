const bugsnag = require('../lib/utils')

describe('getMetadataFromRequest', () => {
  it('Can init bugsnag', () => {
    const metadata = bugsnag.getMetaDataFromRequest({ raw: { req } })

    expect(metadata.requestInfo.clientIp).toEqual(req.ip)
    expect(metadata.requestInfo.headers).toEqual(req.headers)
    expect(metadata.requestInfo.httpMethod).toEqual(req.method)
    expect(metadata.requestInfo.url).toEqual(`https://${req.url}`)
    expect(metadata.requestInfo.referer).toEqual(req.headers.referrer)
  })
})

const req = {
  ip: '12345',
  headers: { referrer: 'test referrer' },
  method: 'PUT',
  url: 'www.test/com',
  protocol: 'https',
  connection: {}
}
