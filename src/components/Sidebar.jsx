import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faPlus, faList, faChartBar, faChartSimple, faFileContract, faRightFromBracket, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import SidebarItem from './SidebarItem';
import { useRouter } from 'next/router';
import { signOut } from "next-auth/react"

export default function Sidebar({ isOpen, toggleSidebar }) {
  const router = useRouter()

  const [isExpanded, setIsExpanded] = useState(false);
  const [pathname, setPathname] = useState('');

  const getPathname = (string = null) => {
    if(!string) return
    const result = string.replace(/^\//, '').split('/');
    setPathname(result[0])
  }

  useEffect(() => {
    if(!router.isReady) return;
    getPathname(router.pathname)
  }, [router]);

  return (
    // <div className={` bg-gray-800 text-white lg:w-64 w-64 space-y-6 px-2 py-7 fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition duration-200 ease-in-out lg:relative lg:translate-x-0`}>
    <div className={`fixed bg-[#0F123F] w-[250px] h-full left-0 top-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition duration-200 ease-in-out lg:translate-x-0 z-20`}>
      <div className="min-h-[70px] flex place-items-center gap-[10px] px-[20px]">
        <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center bg-gradient-to-r from-[#AF90EB] to-[#9269E2] text-white font-bold">C</div>
        <div className="text-md font-bold text-white">CarRent</div>
      </div>
      <nav className="px-[20px] py-[40px]">
        <ul className="space-y-4">
          <SidebarItem href="/" icon={faChartSimple} text="Dashboard" active={router.pathname == '/'}/>
          <SidebarItem 
            href="/transactions" 
            icon={faFileContract} 
            text="Data Transaksi" 
            active={router.pathname == '/transactions'}
            isExpanded={pathname == 'transactions'}
          >
              <ul className="ml-4 mt-1 space-y-4 text-[16px]">
                <SidebarItem href="/transactions/create" icon={faChevronRight} text="Buat Transaksi" active={router.pathname == '/transactions/create'}/>
                <SidebarItem href="/transactions/list" icon={faChevronRight} text="List Transaksi" active={router.pathname == '/transactions/list' || router.pathname == `/transactions/edit/[id]`}/>
                <SidebarItem href="/transactions/recap" icon={faChevronRight} text="Rekap Transaksi" active={router.pathname == '/transactions/recap'}/>
              </ul>
          </SidebarItem>
          <SidebarItem icon={faRightFromBracket} text="Keluar" onClick={signOut} isExpandable/>
        </ul>
      </nav>
    </div>
  );
}
