import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
      return (
            <Link className='flex items-center gap-1' href="/">
                 <Image alt='logo' src={"/assets/wanderlast.png"} width={150} height={40}>
                 </Image>
                
            </Link>
      );
};

export default Logo;