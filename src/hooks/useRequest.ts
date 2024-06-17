import useSWR, { Key, SWRConfiguration  } from 'swr'

import fetcher, { METHOD } from '../helpers/fetcher'


const useRequest = <T>(key: Key, method: keyof typeof METHOD, config?: SWRConfiguration) => {
  const { data, error, ...swr } = useSWR<T>(key, fetcher[method], config);

  return {
    data,
    error,
    ...swr,
  };
};

export default useRequest;