const request = require('superagent-promise')(require('superagent'), Promise)
const qs = require('qs')

const sdk = {
  version: '0.9.1'
}

class Client {
  constructor (options = {}) {
    this.token = options.token
    this.secret = options.secret
    this.baseUrl = options.baseUrl || 'https://api.atext.io'
  }

  getToken () {
    const encoded = Buffer.from(this.token + ':' + this.secret).toString('base64')
    return 'Basic ' + encoded
  }

  async createTranscript (data) {
    const url = `${this.baseUrl}/v1/transcripts`
    const token = this.getToken()

    const res = await request
      .post(url)
      .send(data)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .end()

    return res.body
  }

  async listTranscripts (filter = {}) {
    const token = this.getToken()
    const url = `${this.baseUrl}/v1/transcripts?${qs.stringify(filter)}`

    const res = await request
      .get(url)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .end()

    return res.body
  }

  async getTranscript (uuid) {
    const url = `${this.baseUrl}/v1/transcripts/${uuid}`
    const token = this.getToken()

    const res = await request
      .get(url)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .end()

    return res.body
  }
}

sdk.Client = Client

module.exports = sdk
