import { createInstance } from './base'

export const AccountInstance = createInstance(
  {
    baseURL: process.env.ACCOUNT_SERVICE + '/',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
    timeout: 5000,
  },
  {
    response: {
      onFulfilled: function (response) {
        response.data = response.data.data
      },
    },
  }
)

export const BlobInstance = createInstance({
  baseURL: process.env.MEDIA_SERVICE,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
  maxBodyLength: 8 * 1024 * 1024,
  maxContentLength: 8 * 1024 * 1024,
})

export const HashnetInstance = createInstance({
  baseURL: process.env.HASHET_SERVICE,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 50000,
})

export const HashtagInstance = createInstance({
  baseURL: process.env.HASHTAG_SERVICE,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 50000,
})

export const ImageInstance = createInstance({
  baseURL: process.env.MEDIA_SERVICE,
  timeout: 50000,
})

export const LabelInstance = createInstance({
  baseURL: process.env.LABEL_SERVICE,
  withCredentials: true,
  //   headers: { 'Content-Type': 'application/json' },
  timeout: 50000,
})

export const MetaInstance = createInstance({
  baseURL: process.env.DASHBOARD_API,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 500000,
})

export const ScrapperInstance = createInstance({
  baseURL: process.env.SCRAPPER_SERVICE,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

export const UserInstance = createInstance({
  baseURL: process.env.ACCOUNT_SERVICE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 2000,
})
