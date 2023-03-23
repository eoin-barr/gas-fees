import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gasLimitValue, setGasLimitValue as _setGasLimitValue } from '../slice';

export const useGasLimit = () => {
  const gasLimit = useAppSelector(gasLimitValue);
  const dispatch = useAppDispatch();

  return useMemo(() => {
    const setGasLimit = (value: number) => {
      dispatch(_setGasLimitValue(value));
    };

    return { gasLimit, setGasLimit };
  }, [gasLimit, dispatch]);
};
