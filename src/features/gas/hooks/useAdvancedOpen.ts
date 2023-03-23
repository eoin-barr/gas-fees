import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useMemo } from 'react';
import {
  advancedOpen as _advancedOpen,
  setAdvancedOpen as _setAdvancedOpen,
} from '../slice';

export const useAdvancedOpen = () => {
  const advancedOpen = useAppSelector(_advancedOpen);
  const dispatch = useAppDispatch();

  return useMemo(() => {
    const setAdvancedOpen = (value: boolean) => {
      dispatch(_setAdvancedOpen(value));
    };

    return { advancedOpen, setAdvancedOpen };
  }, [advancedOpen, dispatch]);
};
