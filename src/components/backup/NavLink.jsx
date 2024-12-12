import Link from 'next/link';

const NavLink = ({ href, children }) => (
  <Link href={href} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
    {children}
  </Link>
);

export default NavLink;