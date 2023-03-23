import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { maxFeeValue, setMaxFeeValue as _setMaxFeeValue } from '../slice';

export const useMaxFee = () => {
  const maxFee = useAppSelector(maxFeeValue);
  const dispatch = useAppDispatch();

  return useMemo(() => {
    const setMaxFee = (value: number) => {
      dispatch(_setMaxFeeValue(value));
    };

    return { maxFee, setMaxFee };
  }, [maxFee, dispatch]);
};
