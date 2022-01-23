import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface Navchildren {}

export default function Navchildren(props: Navchildren) {
  const router = useRouter();
  const { pathname } = router;
  return (
    <>
      <Link href="/my-music">
        <div
          className="pb-4 mr-9 font-semibold text-gray-500 cursor-pointer hover:text-white"
          style={{ fontSize: '22px' }}
        >
          <span
            className={`${
              pathname === '/my-music' || pathname.split('/')?.[1] === 'my-music'
                ? 'text-white'
                : ''
            }`}
          >
            Playlists
          </span>
        </div>
      </Link>
      <Link href="/account">
        <div
          className="pb-4 mr-9 font-semibold text-gray-500 cursor-pointer hover:text-white"
          style={{ fontSize: '22px' }}
        >
          <span className={`${pathname.split('/')?.[1] === 'account' ? 'text-white' : ''}`}>
            Account
          </span>
        </div>
      </Link>
      <Link href="/downloads">
        <div
          className="pb-4 mr-9 font-semibold text-gray-500 cursor-pointer hover:text-white"
          style={{ fontSize: '22px' }}
        >
          <span className={`${pathname === '/downloads' ? 'text-white' : ''}`}>Downloads</span>
        </div>
      </Link>
      <Link href="/referral">
        <div
          className="pb-4 mr-9 font-semibold text-gray-500 cursor-pointer hover:text-white"
          style={{ fontSize: '22px' }}
        >
          <span className={`${pathname === '/referral' ? 'text-white' : ''}`}>Referral</span>
        </div>
      </Link>
    </>
  );
}
