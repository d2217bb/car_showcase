import React from 'react';
import Image from 'next/image';
import { footerLinks } from '@/constants';

const Footer = () => {
  return (
    <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
        {/* Logo + descriere */}
        <div className="flex flex-col justify-start items-start gap-6">
          <Image
            src="/logo.svg"
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />
          <p className="text-base text-gray-700">
            CarHub 2025
            <br />
            All rights reserved &copy;
          </p>
        </div>

        {/* Footer Links */}
        <div className="footer__links flex flex-wrap gap-10">
          {footerLinks.map((link) => (
            <div key={link.title} className="footer__link flex flex-col gap-3">
              <h3 className="font-bold">{link.title}</h3>
              {link.links.map((item) => (
                <link key={item.title} href={item.url} className="text-gray-500 hover:text-gray-900">
                  {item.title}
                </link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
