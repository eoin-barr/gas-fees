import React, { FC } from 'react';

interface NumberInputProps {
  min: number;
  step: number;
  value: number | string;
  handleFocus: (value: null) => void;
  handleChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (value: React.FocusEvent<HTMLInputElement, Element>) => void;
}
export const NumberInput: FC<NumberInputProps> = ({
  min,
  step,
  value,
  handleBlur,
  handleFocus,
  handleChange,
}) => {
  return (
    <input
      min={min}
      type={'number'}
      value={value}
      step={step}
      onFocus={() => handleFocus(null)}
      onBlur={(e) => handleBlur(e)}
      onChange={(e) => handleChange(e)}
      className="w-full rounded-md p-2 bg-gray-100 focus-none outline-none ring-none caret-blue-500"
    />
  );
};
