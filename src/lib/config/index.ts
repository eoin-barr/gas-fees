export namespace NEXTAPI {
  export const BASE_URL = '/api';

  export enum GAS_FEE {
    gasFee = '/gasfee',
  }
}

export namespace ETHERSCANAPI {
  export const BASE_URL = 'https://api.etherscan.io/api';
  export const ETH_PRICE = `?module=stats&action=ethprice&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;
}
