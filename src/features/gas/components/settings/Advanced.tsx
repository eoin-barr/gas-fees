import axios from 'axios';
import { Slider } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useMaxFee } from '../../hooks/useMaxFee';
import { useGasLimit } from '../../hooks/useGasLimit';
import { useAdvancedOpen } from '../../hooks/useAdvancedOpen';
import { useUpdateGasFeeMutation, useGetGasFeeQuery } from '../../api';
import {
  GasFeeError,
  GasLimitError,
  GWEI_TO_ETH,
  MAX_GAS_FEE,
  MAX_GAS_LIMIT,
} from '../../utils';
import { ETHERSCANAPI } from '@/lib/config';

export const AdvancedSettings: FC = () => {
  const { maxFee, setMaxFee } = useMaxFee();
  const { advancedOpen } = useAdvancedOpen();
  const { gasLimit, setGasLimit } = useGasLimit();
  const [updateGasFee, result] = useUpdateGasFeeMutation();
  const { data, isLoading } = useGetGasFeeQuery({ refetchOnMountOrArgChange: true });
  const [gasFeeUSD, setGasFeeUSD] = useState<string | null>(null);
  const [gasFeeError, setGasFeeError] = useState<GasFeeError | null>(null);
  const [gasLimitError, setGasLimitError] = useState<GasLimitError | null>(null);

  const handleGasFeeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGasFeeError(null);
    if (value == '') {
      updateGasFee({ gasFee: 0 });
      return;
    }
    if (parseInt(value) > MAX_GAS_FEE) {
      setGasFeeError(GasFeeError.TOO_HIGH);
      updateGasFee({ gasFee: MAX_GAS_FEE });
      return;
    }
    updateGasFee({ gasFee: parseInt(value) });
  };

  const handleGasLimitInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGasLimitError(null);
    if (parseInt(value) > MAX_GAS_LIMIT) {
      setGasLimitError(GasLimitError.TOO_HIGH);
      setGasLimit(MAX_GAS_LIMIT);
      return;
    }
    setGasLimit(value === '' ? String(NaN) : parseInt(value));
  };

  const convertGasFeeToUSD = async () => {
    if (data) {
      try {
        const res = await axios.get(`${ETHERSCANAPI.BASE_URL}${ETHERSCANAPI.ETH_PRICE}`);
        const formattedGasFeeUSD =
          ((data.gasFee * res.data.result.ethusd) / GWEI_TO_ETH).toFixed(2) || '0.00';
        setGasFeeUSD(formattedGasFeeUSD);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    convertGasFeeToUSD();
  }, [data]);

  return (
    <div id={'advanced settings'} className="w-full">
      {advancedOpen ? (
        <div className="text-gray-800 w-full">
          <div className="flex flex-col items-start justify-start w-full my-2">
            <div>
              <p className="font-medium">Gas Fee (GWEI)</p>
            </div>
            <div className="w-full mt-2 relative">
              {data && (
                <input
                  min={0}
                  type={'number'}
                  value={data.gasFee}
                  onFocus={() => setGasFeeError(null)}
                  onBlur={(e) => handleGasFeeInput(e)}
                  onChange={(e) => handleGasFeeInput(e)}
                  className="w-full rounded-md p-2 bg-gray-100 focus-none outline-none ring-none caret-blue-500"
                />
              )}
              {gasFeeError ? (
                <p className="text-red-500 text-xs font-normal">{gasFeeError}</p>
              ) : (
                <div className="h-4" />
              )}
              <div className="absolute right-2 top-2 z-10 text-gray-500">
                {gasFeeUSD && <span>${gasFeeUSD}</span>}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full my-2">
            <div>
              <p className="font-medium">Gas Limit</p>
            </div>
            <div className="w-full mt-2">
              <input
                min={0}
                type={'number'}
                value={gasLimit}
                onFocus={() => setGasLimitError(null)}
                onBlur={(e) => handleGasLimitInput(e)}
                onChange={(e) => handleGasLimitInput(e)}
                className="w-full rounded-md p-2 bg-gray-100 focus-none outline-none ring-none caret-blue-500"
              />
              {gasLimitError ? (
                <p className="text-red-500 text-xs font-normal">{gasLimitError}</p>
              ) : (
                <div className="h-4" />
              )}
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full my-2">
            <div>
              <p className="font-medium">Max Fee (GWEI)</p>
            </div>
            <div className="w-full mt-2">
              <Slider
                min={10}
                max={50}
                size="small"
                value={maxFee}
                aria-label="Small"
                defaultValue={maxFee}
                valueLabelDisplay="auto"
                onChange={(e, val) => setMaxFee(val as number)}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
