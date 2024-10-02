import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setState } from "../redux/stateSlice";

export const useMutate = (url: string, id: string, fn: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    fn(url).then((res: any) => {
      if (res && res.code && res.code !== 200) {
        return dispatch(
          setState({ id, data: null, isLoading: false, error: true }),
        );
      }
      const result = res?.data || res;

      if (result) {
        dispatch(
          setState({
            id,
            data: result,
            isLoading: false,
            error: null,
          }),
        );
      }
    });
  }, []);
};

export const useRSR = (url: string, id: string, fn: any) => {
  useMutate(url, id, fn);

  const { data, error, isLoading } = useSelector((state: any) =>
    state.states.data[id] ? state.states.data[id] : state.states.data.default,
  );

  return { data, error, isLoading };
};

export const mutateApiData = async (
  key: string,
  id: string,
  currentData: any,
  fetcher: (url: string) => Promise<any>,
  property: string,
  retries = 1,
  time = 2,
) => {
  if (retries === 11) {
    return "";
  }

  const data = await fetcher(key);

  const isEqual = arrayEquals(data, currentData);

  if (isEqual) {
    if (retries <= 6) {
      await delay(1000);
      mutateApiData(key, id, currentData, fetcher, property, retries + 1, time);
    } else {
      await delay(1000 * time);
      mutateApiData(
        key,
        id,
        currentData,
        fetcher,
        property,
        retries + 1,
        time + 1,
      );
    }

    return undefined;
  }

  return data;
};

export const arrayEquals = (a: any[], b: any[]) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

export const delay = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
