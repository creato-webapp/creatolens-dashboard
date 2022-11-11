import axios from 'axios'
// fetcher
export const Fetcher = {
  POST: async (url: string, data: any) => await axios.post(url, data),
  GET: async (url: string, Id: string) => {
    console.log(url + Id)
    return await axios.get(url + Id).then((res) => res.data)
  },

  PATCH: async (url: string, data: any) => await axios.patch(url, data),
  DELETE: async (url: string) => await axios.delete(url),
}
