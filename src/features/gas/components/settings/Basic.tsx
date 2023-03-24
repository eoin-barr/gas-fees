import { FC } from 'react';
import { GWEI_TO_ETH } from '../../utils';
import { Toggle } from '@/components/toggle';
import { useMaxFee } from '../../hooks/useMaxFee';
import { SelectButton } from '@/components/elements';
import { useAdvancedOpen } from '../../hooks/useAdvancedOpen';

export const BasicSettings: FC = () => {
  const { maxFee, setMaxFee } = useMaxFee();
  const { advancedOpen, setAdvancedOpen } = useAdvancedOpen();
  const formattedMaxFee = (maxFee / GWEI_TO_ETH).toFixed(9);

  return (
    <div>
      <div className="flex items-center justify-between text-gray-800">
        <div className="flex space-x-2">
          <p className="font-semibold">Max Fee:</p> <p>{formattedMaxFee}</p>
        </div>
      </div>
      <div>
        <div>
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
