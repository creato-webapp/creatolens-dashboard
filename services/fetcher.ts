import axios from 'axios'
// fetcher
export const Fetcher = {
  POST: async (url: string, data: any) => await axios.post(url, data),
  GET: async (url: string, params: any) => {
    return await axios.get(`${url}`, { params: params }).then((res) => res.data)
  },
  PATCH: async (url: string, data: any) => await axios.patch(url, data),
  DELETE: async (url: string) => await axios.delete(url),
}

export const FetchWithId = {
  GET: async (url: string, id: string) => {
    const newUrl = `${url}${id}`
    return await Fetcher.GET(newUrl, { id: id }).then((res) => res)
  },
}
