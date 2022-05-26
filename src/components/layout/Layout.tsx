import * as React from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <>
      {children}
      <div className='grid justify-items-stretch'>
        <footer className='absolute bottom-2 justify-self-center text-gray-700'>
          © {new Date().getFullYear()} By{' '}
          <UnderlineLink href='https://jason-devs.me'>Jason Hiew</UnderlineLink>
        </footer>
      </div>
    </>
  );
}
