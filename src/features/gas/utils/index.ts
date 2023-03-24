export const MAX_GAS_FEE = 100000;
export const MAX_GAS_LIMIT = 1000000;
export const GWEI_TO_ETH = 1000000000;

export enum GasFeeError {
  TOO_HIGH = 'Max gas fee is 100,000 GWEI',
}

export enum GasLimitError {
  TOO_HIGH = 'Max gas limit is 1,000,000',
}
