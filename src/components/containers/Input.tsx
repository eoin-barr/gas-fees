import { FC } from 'react';

interface Props {
  children: React.ReactNode;
  title: string;
}

export const InputContainer: FC<Props> = ({ children, title }) => {
  return (
    <div className="flex flex-col items-start justify-start w-full my-2">
      <div>
        <p className="font-medium">{title}</p>
      </div>
      {children}
    </div>
  );
};
