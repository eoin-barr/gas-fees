import React, { FC } from 'react';
import { Slider } from '@mui/material';
import { Modal } from '@/components/modal';
import { Toggle } from '@/components/toggle';
import { useMaxFee } from '../hooks/useMaxFee';
import { useGasLimit } from '../hooks/useGasLimit';
import { SelectButton } from '@/components/elements';
import { useAdvancedOpen } from '../hooks/useAdvancedOpen';
import { useGetGasFeeQuery, useUpdateGasFeeMutation } from '../api';
import { AdvancedSettings, BasicSettings } from './settings';
import { GWEI_TO_ETH } from '../utils';

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
  if (isNaN(maxFee) || gasLimit === 'NaN') {
    total = '0.0';
  } else {
    if (typeof gasLimit === 'number') {
      total = ((maxFee * gasLimit) / GWEI_TO_ETH).toFixed(9);
    }
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
