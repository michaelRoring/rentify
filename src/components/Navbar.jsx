import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="block lg:hidden bg-[#F4F7FC] fixed w-full top-0 p-4 flex justify-end items-center min-h-[70px] z-10">
      <button className="lg:hidden" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>
    </nav>
  );
}
