import { Reducer, useEffect, useReducer, useState } from 'react';

interface DataApiState<T> {
  isLoading: boolean;
  data: T;
  error?: Error;
}

type Action<T> =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; data: T }
  | { type: 'FETCH_FAILURE'; error: Error };

function dataFetchReducer<T>(state: DataApiState<T>, action: Action<T>) {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    default:
      throw new Error('Invalid action');
  }
}

export function useDataApi<T, U>(
  initialData: T,
  initialConfig: U,
  fetchApi: (config: U) => Promise<T>
) {
  const [requestConfig, setRequestConfig] = useState(initialConfig);
  const [state, dispatch] = useReducer<Reducer<DataApiState<T>, Action<T>>>(dataFetchReducer, {
    isLoading: false,
    data: initialData,
    error: undefined,
  });

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await fetchApi(requestConfig);
        dispatch({ type: 'FETCH_SUCCESS', data: result });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE', error: error as Error });
      }
    }

    fetchData();
  }, [requestConfig, fetchApi]);

  function doFetch(requestConfig: U) {
    setRequestConfig(requestConfig);
  }

  return {
    ...state,
    doFetch,
  };
}