import React, { FC } from 'react';
import { Slider } from '@mui/material';
import { Modal } from '@/components/modal';
import { Toggle } from '@/components/toggle';
import { useMaxFee } from '../hooks/useMaxFee';
import { useGasLimit } from '../hooks/useGasLimit';
import { SelectButton } from '@/components/elements';
import { useAdvancedOpen } from '../hooks/useAdvancedOpen';
import { useGetGasFeeQuery, useUpdateGasFeeMutation } from '../api';

interface GasModalProps {
  openModal: boolean;
  handleClose: () => void;
}

interface CloseButtonProps {
  handleClose: () => void;
}

const Header: FC = () => {
  const { maxFee } = useMaxFee();
  const { gasLimit } = useGasLimit();
  let total;
  if (isNaN(maxFee) || isNaN(gasLimit)) {
    total = '0.0';
  } else {
    total = ((maxFee * gasLimit) / 10 ** 9).toFixed(9);
  }

  return (
    <div>
      <h3 className="modal-header text-gray-900 text-lg font-semibold">Gas settings</h3>
      <div className="text-center mt-4 mb-5">
        <h1 className="text-gray-900 text-3xl font-semibold">~{total}</h1>
      </div>
    </div>
  );
};

const BasicSettings: FC = () => {
  const { maxFee, setMaxFee } = useMaxFee();
  const { advancedOpen, setAdvancedOpen } = useAdvancedOpen();
  const { data, isLoading } = useGetGasFeeQuery({ refetchOnMountOrArgChange: true });
  const formattedMaxFee = (maxFee / 10 ** 9).toFixed(9);

  return (
    <div id={'normal settings'}>
      <div className="flex items-center justify-between text-gray-800">
        <div className="flex space-x-2">
          <p className="font-semibold">Max Fee:</p> <p>{formattedMaxFee}</p>
        </div>
        <div>
          <p className="text-gray-400">usd</p>
        </div>
      </div>
      <div>
        <div>
          {data && console.log('DATA: ', data)}
          <h4 className="text-md text-gray-800 mt-4 mb-2">
            <p className="font-semibold">Priority</p>
          </h4>
          <div id={'buttons'} className="flex items-center justify-center space-x-2">
            <SelectButton
              text={'Low'}
              selected={maxFee == 10}
              handleClick={() => setMaxFee(10)}
            />
            <SelectButton
              text={'Medium'}
              selected={maxFee == 20}
              handleClick={() => setMaxFee(20)}
            />
            <SelectButton
              text={'High'}
              selected={maxFee == 50}
              handleClick={() => setMaxFee(50)}
            />
            <SelectButton
              text={'Custom'}
              selected={maxFee != 10 && maxFee != 20 && maxFee != 50}
              handleClick={() => setAdvancedOpen(true)}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between text-gray-800 pt-8 pb-4">
        <div>
          <p className="text-gray-800 font-semibold">Advanced Options</p>
        </div>
        <div>
          <Toggle check={advancedOpen} callback={() => setAdvancedOpen(!advancedOpen)} />
        </div>
      </div>
    </div>
  );
};

const AdvancedSettings: FC = () => {
  const { maxFee, setMaxFee } = useMaxFee();
  const { advancedOpen } = useAdvancedOpen();
  const { gasLimit, setGasLimit } = useGasLimit();
  const [updateGasFee, result] = useUpdateGasFeeMutation();
  const { data, isLoading } = useGetGasFeeQuery({ refetchOnMountOrArgChange: true });

  const handleGasFeeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateGasFee({ gasFee: parseInt(value) });
  };

  const handleGasLimitInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGasLimit(parseInt(value));
  };

  return (
    <div id={'advanced settings'} className="w-full">
      {advancedOpen ? (
        <div className="text-gray-800 w-full">
          <div className="flex flex-col items-start justify-start w-full my-2">
            <div>
              <p className="font-medium">Gas Fee (GWEI)</p>
            </div>
            <div className="w-full mt-2">
              {data && (
                <input
                  min={0}
                  type={'number'}
                  value={data.gasFee}
                  onBlur={(e) => handleGasFeeInput(e)}
                  onChange={(e) => handleGasFeeInput(e)}
                  className="w-full rounded-md p-2 bg-gray-100 focus-none outline-none ring-none caret-blue-500"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full my-2">
            <div>
              <p className="font-medium">Gas Limit (GWEI)</p>
            </div>
            <div className="w-full mt-2">
              <input
                min={0}
                type={'number'}
                value={gasLimit}
                onBlur={(e) => handleGasLimitInput(e)}
                onChange={(e) => handleGasLimitInput(e)}
                className="w-full rounded-md p-2 bg-gray-100 focus-none outline-none ring-none caret-blue-500"
              />
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

const CloseButton: FC<CloseButtonProps> = ({ handleClose }) => {
  return (
    <div className="mt-5 sm:mt-6">
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-lg bg-blue-500 px-3 py-2 text-white shadow-sm hover:bg-blue-600 "
        onClick={handleClose}
      >
        Close
      </button>
    </div>
  );
};

export const GasModal: FC<GasModalProps> = ({ openModal, handleClose }) => {
  return (
    <Modal openModal={openModal} handleClose={handleClose}>
      <>
        <Header />
        <BasicSettings />
        <AdvancedSettings />
        <CloseButton handleClose={handleClose} />
      </>
    </Modal>
  );
};
