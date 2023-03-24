import { FC } from 'react';

interface Props {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
}

export const PrimaryButton: FC<Props> = ({ handleClick, text }) => {
  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 active:bg-blue-400 py-2 px-4 rounded-md shadow-xl"
    >
      {text}
    </button>
  );
};
