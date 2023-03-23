import { FC } from 'react';

interface Props {
  text: string;
  selected: boolean;
  handleClick: () => void;
}

export const SelectButton: FC<Props> = ({ text, selected, handleClick }) => {
  const baseClasses = `rounded-lg px-4 py-1 mr-2`;
  const selectedClasses = `${
    selected
      ? 'bg-blue-500 text-gray-100 '
      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
  } `;
  const classes = `${baseClasses} ${selectedClasses}`;

  return (
    <button onClick={handleClick} className={classes}>
      {text}
    </button>
  );
};
