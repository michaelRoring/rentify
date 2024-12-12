import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SidebarItem({ href, isExpandable, isExpanded, children, ...props }) {
  return (
    <li className="">
      {isExpandable ? (
        <Item {...props} />
      ) : (
        <Link href={href}>
         <Item {...props} />
        </Link>
      )}
      {isExpanded && children}
    </li>
  );
}

const Item = ({text, icon, active, onClick}) => {
  return (
    <div className={`
      hover:bg-[#AF90EB] 
      rounded-xl 
      px-4 
      py-3 
      flex 
      items-center 
      gap-[16px] 
      font-semibold 
      cursor-pointer 
      text-[14px] 
      text-white
      ${active ? 'bg-[#AF90EB]' : ''}
    `} 
      onClick={onClick} 
    >
      <FontAwesomeIcon icon={icon} className="mr-2" />
      <span>{text}</span>
    </div>
  )
}
