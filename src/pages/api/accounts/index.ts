import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import requestIp from 'request-ip'

import { IAccount } from '@components/Account/Account'
import ENDPOINT_BACKEND from '@constants/endpoints/backend'

import AccountInstance from '../axiosInstance/Account'

interface IGeoResponse {
  code: number
  data: GeoBody
}
interface GeoBody {
  type: string
  features: Feature[]
}

interface Feature {
  type: string
  properties: Properties
  geometry: Geometry
}

interface Properties {
  address: string
  city: string
  country: string
  hostname: string
  ip: string
  lat: number
  lng: number
  ok: boolean
  org: string
  postal: string
  raw: Raw
  state: string
  status: string
}

interface Raw {
  ip: string
  hostname: string
  city: string
  region: string
  country: string
  loc: string
  org: string
  postal: string
  timezone: string
  readme: string
}

interface Geometry {
  type: string
  coordinates: number[]
}

export default async function accountQueryHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { pageNumber, pageSize, orderBy, isAsc },
    body,
    method,
  } = req
  const cookieHeader = {
    headers: {
      Cookie: req.headers.cookie,
    },
  }

  const GEO_CODER_API = process.env.GEO_CODER_API
  switch (method) {
    case 'GET': {
      const response = await AccountInstance.get(ENDPOINT_BACKEND.ACCOUNTS_PAGINATION, {
        headers: {
          Cookie: req.headers.cookie,
        },
        params: {
          page_number: pageNumber,
          page_size: pageSize,
          orderby: orderBy,
          isAsc,
        },
      })
      return res.status(response.status).json(response.data)
    }

    case 'POST': {
      const account = await AccountInstance.post<IAccount>(
        ENDPOINT_BACKEND.CREATE_NEW_ACCOUNT,
        {
          username: body.username,
          pwd: body.password,
        },
        cookieHeader
      )

      if (account.data.id === undefined) {
        return res.status(account.status).json(account.data)
      }

      const clientIp = requestIp.getClientIp(req)
      if (clientIp === null) {
        return res.status(400).json({ message: 'Client IP not found' })
      }
      const geoResponse = GEO_CODER_API
        ? await axios.get<IGeoResponse>(GEO_CODER_API, {
            ...cookieHeader,
            params: {
              ip: clientIp,
            },
          })
        : null
      const countryCode = geoResponse?.data.data.features[0].properties.country ?? 'HK'
      const response = await AccountInstance.patch(
        `${ENDPOINT_BACKEND.UPDATE_ACCOUNT}/${account.data.id}`,
        {
          location: countryCode,
        },
        cookieHeader
      )
      return res.status(response.status).json(response.data)
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
