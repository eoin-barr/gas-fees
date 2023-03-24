import { FC } from 'react';

interface InputErrorProps {
  error: string | null;
}

export const InputError: FC<InputErrorProps> = ({ error }) => {
  return (
    <>
      {error ? (
        <p className="text-red-500 text-xs font-normal">{error}</p>
      ) : (
        <div className="h-4" />
      )}
    </>
  );
};
