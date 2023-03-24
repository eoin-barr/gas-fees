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
import { InputError } from '@/components/error';
import { InputContainer } from '@/components/containers';
import { NumberInput } from '@/components/elements/input';

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
    if (parseFloat(value) > MAX_GAS_FEE) {
      setGasFeeError(GasFeeError.TOO_HIGH);
      updateGasFee({ gasFee: MAX_GAS_FEE });
      return;
    }
    //set max length of input to 8
    if (String(value).split('.').length > 1) {
      if (String(value).split('.')[1].length > 2) {
        return;
      }
    }
    updateGasFee({ gasFee: parseFloat(value) });
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
    <div className="w-full">
      {advancedOpen ? (
        <div className="text-gray-800 w-full">
          <InputContainer title={'Gas Fee (GWEI)'}>
            <div className="w-full mt-2 relative">
              {data && (
                <NumberInput
                  min={0}
                  step={0.01}
                  value={data.gasFee}
                  handleFocus={() => setGasFeeError(null)}
                  handleBlur={(e) => handleGasFeeInput(e)}
                  handleChange={(e) => handleGasFeeInput(e)}
                />
              )}
              <InputError error={gasFeeError} />
              <div className="absolute right-2 top-2 z-10 text-gray-500">
                {gasFeeUSD && <span>${gasFeeUSD}</span>}
              </div>
            </div>
          </InputContainer>
          <InputContainer title={'Gas Limit'}>
            <div className="w-full mt-2">
              <NumberInput
                min={0}
                step={1}
                value={gasLimit}
                handleFocus={() => setGasLimitError(null)}
                handleBlur={(e) => handleGasLimitInput(e)}
                handleChange={(e) => handleGasLimitInput(e)}
              />
              <InputError error={gasLimitError} />
            </div>
          </InputContainer>
          <InputContainer title={'Max Fee (GWEI)'}>
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
          </InputContainer>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
