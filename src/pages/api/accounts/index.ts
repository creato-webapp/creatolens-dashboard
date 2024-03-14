import type { NextApiRequest, NextApiResponse } from 'next'
import requestIp from 'request-ip'
import AccountInstance from '../axiosInstance/Account'
import { IAccount } from '@lib/Account/Account'
import axios from 'axios'

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
  switch (method) {
    case 'GET': {
      const response = await AccountInstance.get(`/accounts?page_number=${pageNumber}&page_size=${pageSize}&orderby=${orderBy}&isAsc=${isAsc}`, {
        headers: {
          Cookie: req.headers.cookie,
        },
      })
      return res.status(response.status).json(response.data)
    }

    case 'POST': {
      const account = await AccountInstance.post<IAccount>('/accounts/create', body, {
        headers: {
          Cookie: req.headers.cookie,
        },
      })

      if (account.data.id === undefined) {
        return res.status(400).json({ message: 'Account Create Failed' })
      }

      const clientIp = requestIp.getClientIp(req)
      const geoResponse = process.env.GEO_CODER_API
        ? await axios.get<IGeoResponse>(process.env.GEO_CODER_API, {
            headers: {
              Cookie: req.headers.cookie,
            },
            params: {
              ip: clientIp,
            },
          })
        : null
      const countryCode = geoResponse?.data?.data?.features[0]?.properties?.country
      const response = await AccountInstance.patch(
        `/accounts/update/${account.data.id}`,
        {
          location: countryCode,
        },
        {
          headers: {
            Cookie: req.headers.cookie,
          },
        }
      )
      return res.status(response.status).json(response.data)
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
