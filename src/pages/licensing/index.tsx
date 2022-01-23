import Link from 'next/link';
import * as React from 'react';
import { ReactNode } from 'react';
import MainLayout from 'src/components/common/LayOut/Layout';

export interface LicensingProps {
  children: ReactNode;
}

export default function Licensing(props: LicensingProps) {
  const { children } = props;
  return (
    <MainLayout disableTab disableNav>
      <div
        className="fixed h-16 top-0 left-0 right-0 w-full"
        style={{ backgroundColor: '#0f0f0f' }}
      >
        <div
          className="h-full flex items-center justify-between mx-auto"
          style={{ width: '1200px' }}
        >
          <div className="text-2xl ">SVM Music</div>
          <Link href="/music/Feature">
            <a className="text-xl cursor-pointer"> {'<'} Back</a>
          </Link>
        </div>
      </div>
      <div>{children}</div>
    </MainLayout>
  );
}
