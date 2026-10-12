'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { Suspense } from 'react';

const ActiveNavLink = ({ href, children }) => {
      const path = usePathname();
      return (
           <Link className={`${path.startsWith(href) && "text-primary"} font-medium`} href={href}>
            {children}
           </Link>
      );
};

const NavLink = ({ href, children }) => (
      <Suspense fallback={<Link className="font-medium" href={href}>{children}</Link>}>
            <ActiveNavLink href={href}>{children}</ActiveNavLink>
      </Suspense>
);

export default NavLink;