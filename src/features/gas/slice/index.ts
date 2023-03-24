import { RootState } from '@/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GasState = {
  gasLimitValue: string | number;
  maxFeeValue: number;
  advancedOpen: boolean;
};

export const gasSlice = createSlice({
  name: 'gas',
  initialState: { gasLimitValue: 20, maxFeeValue: 10, advancedOpen: false } as GasState,
  reducers: {
    setGasLimitValue: (state, action: PayloadAction<number | string>) => {
      state.gasLimitValue = action.payload;
    },
    setMaxFeeValue: (state, action: PayloadAction<number>) => {
      state.maxFeeValue = action.payload;
    },
    setAdvancedOpen: (state, action: PayloadAction<boolean>) => {
      state.advancedOpen = action.payload;
    },
  },
});

export const gasReducer = gasSlice.reducer;
export const { setGasLimitValue, setMaxFeeValue, setAdvancedOpen } = gasSlice.actions;
export const maxFeeValue = (state: RootState) => state.gas.maxFeeValue;
export const gasLimitValue = (state: RootState) => state.gas.gasLimitValue;
export const advancedOpen = (state: RootState) => state.gas.advancedOpen;
