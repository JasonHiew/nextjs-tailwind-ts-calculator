import * as React from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <>
      <header className='absolute top-2 text-gray-700'>This is header</header>
      {children}
      <footer className='absolute bottom-2 text-gray-700'>
        © {new Date().getFullYear()} By{' '}
        <UnderlineLink href='https://jason-devs.me'>Jason Hiew</UnderlineLink>
      </footer>
    </>
  );
}
