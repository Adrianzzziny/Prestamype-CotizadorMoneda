import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ConversionDirection = 'usdToPen' | 'penToUsd';

interface CurrencyState {
  purchasePrice: number;
  salePrice: number;
  amount: string;
  conversionDirection: ConversionDirection;
}

const initialState: CurrencyState = {
  purchasePrice: 0,
  salePrice: 0,
  amount: '100',
  conversionDirection: 'usdToPen',
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setRates: (state, action: PayloadAction<{ purchasePrice: number; salePrice: number }>) => {
      state.purchasePrice = action.payload.purchasePrice;
      state.salePrice = action.payload.salePrice;
    },
    setAmount: (state, action: PayloadAction<string>) => {
      state.amount = action.payload;
    },
    swapDirection: (state) => {
      state.conversionDirection = state.conversionDirection === 'usdToPen' ? 'penToUsd' : 'usdToPen';
    },

    setDirection: (state, action: PayloadAction<'usdToPen' | 'penToUsd'>) => {
        state.conversionDirection = action.payload;
    },
  },
});

export const { setRates, setAmount, swapDirection, setDirection } = currencySlice.actions;

export default currencySlice.reducer;