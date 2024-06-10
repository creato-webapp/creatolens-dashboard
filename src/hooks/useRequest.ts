import { AxiosRequestConfig } from 'axios';
import useSWR, { SWRConfiguration  } from 'swr'

import { Method, fetcher } from '../helpers/fetcher'

type Keys = [string, unknown?, AxiosRequestConfig?];

const useRequest = <T>(key: Keys | null, method: keyof typeof Method, config?: SWRConfiguration) => {
  const { data, error, ...swr } = useSWR<T>(key, (key) => <T>fetcher[method](...key), config);

  return {
    data,
    error,
    ...swr,
  };
};

export default useRequest;