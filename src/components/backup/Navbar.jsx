// components/navbar/Navbar.js
import { useState } from 'react';
import NavLink from './NavLink';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex-shrink-0">
            <NavLink href="/">PartnerIklan.com</NavLink>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex sm:hidden">
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {isMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:block sm:ml-6">
          <div className="flex space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/news">News</NavLink>
            <Dropdown label="Produk">
              <DropdownItem href="/products/google-adwords">Google AdWords</DropdownItem>
              <DropdownItem href="/products/facebook-ads">Facebook Ads</DropdownItem>
              <DropdownItem href="/products/seo">SEO</DropdownItem>
              <DropdownItem href="/products/training">Training</DropdownItem>
              </Dropdown>
            <NavLink href="/pemesanan">Pemesanan</NavLink>
            <NavLink href="/kontak">Kontak</NavLink>
          </div>
        </div>
          
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/news">News</NavLink>
            <div className="relative">
              <button
                onClick={() => setSubMenuOpen(!isSubMenuOpen)}
                className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Produk
              </button>
              {isSubMenuOpen && (
                <div className="flex flex-col pl-4">
                  <DropdownItem href="/products/google-adwords">Google AdWords</DropdownItem>
                  <DropdownItem href="/products/facebook-ads">Facebook Ads</DropdownItem>
                  <DropdownItem href="/products/seo">SEO</DropdownItem>
                  <DropdownItem href="/products/training">Training</DropdownItem>
                </div>
              )}
            </div>
            <NavLink href="/pemesanan">Pemesanan</NavLink>
            <NavLink href="/kontak">Kontak</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
