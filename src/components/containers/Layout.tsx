import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 text-white-500">
      {children}
    </div>
  );
};
