import { FC } from 'react';

interface Props {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
}

export const BottomButton: FC<Props> = ({ handleClick, text }) => {
  return (
    <button
      type="button"
      className="inline-flex w-full justify-center rounded-lg bg-blue-500 px-3 py-2 text-white shadow-sm hover:bg-blue-600 "
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
