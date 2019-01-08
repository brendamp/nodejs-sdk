# Atexto nodejs-sdk

### Install Atexto SDK

Do `npm i @atexto/atexto-sdk` on you nodejs aplication folder.

### Create a client

To generate your token key/secret go to https://devs.atext.io, create an account and then a token.

Then on you aplication add the following code to create a client that will allow you to create, list and get the detail for your transcriptions.

```js
const sdk = require('@atexto/atexto-sdk')
const client = new sdk.Client({
  key: KEY,
  secret: SECRET
})
```

### Create a transcription

Once you have uploaded the file you want to transcribe into a server, run the following code to create a transcription job in Atexto.

```js
const transcript = await client.createTranscript({
  "audioSrcUrl": "AUDIO_URL",
  "tags": ["demo", "completed"],
  "speakerCount": 2,
  "languageCode": "en",
  "options": {
    "formatText": false,
    "truncatedWords": false
  }
})
```

This will return a `transcript` object with this data:

```json
{
    "uuid": "16a54748-da46-4080-b4a1-fa18a6b223cf",
    "status": "started",
    "audioSrcUrl": "AUDIO_URL",
    "language": "en",
    "tags": [
        "demo",
        "completed"
    ],
    "speakerCount": 2,
    "options": {
        "formatText": false,
        "truncatedWords": false
    },
    "createdAt": "2018-12-08T01:25:49.031Z"
}
```

For all the options and parameters that you can send to create a transcription job review our API docs [here](https://docs.atext.io/article/155-post-transcripts)

### Get a transcription details

Once you have create a transcription job you can review it status and get the transcription once the job with the following code and the job UUID:

```js
const transcript = await client.getTranscript(UUID)
```

This will return a `transcript` object with the following data:

```json
{
    "uuid": "16a54748-da46-4080-b4a1-fa18a6b223cf",
    "status": "processing",
    "audioSrcUrl": "AUDIO_URL",
    "language": "en",
    "tags": [
        "demo",
        "completed"
    ],
    "speakerCount": 2,
    "options": {
        "formatText": false,
        "truncatedWords": false
    },
    "createdAt": "2018-12-08T01:25:49.031Z"
}
```

### List a transcriptions

To list all the job that you have generated in you account use the following code.

```js
const transcripts = await client.listTranscripts()
```

This will return a `transcripts` array with the following data:

```json
{
    "total": 2,
    "data": [
        {
            "uuid": "UUID",
            "status": "processing",
            "audioSrcUrl": "AUDIO_URL",
            "language": "en",
            "tags": [
                "sample",
                "project-1"
            ],
            "createdAt": "2018-12-04T15:42:32.082Z"
        },
        {
            "uuid": "UUID",
            "status": "ready",
            "audioSrcUrl": "AUDIO_URL",
            "language": "en",
            "tags": [
                "sample",
                "second"
            ],
            "createdAt": "2018-12-04T15:47:11.576Z"
        },
    ]
}
```

For paginated request use:

```js
const transcripts = await client.listTranscripts({start: 20})
```

To skip the 20 recent jobs.

### Filter a transcriptions

The jobs can also be filtered by status or tags using the following code:

```js
const transcripts = await client.listTranscripts({status: 'ready'})
```

This will return a `transcripts` array with trasncriptions in ready only.