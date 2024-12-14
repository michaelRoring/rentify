import Image from "next/image";
import IconHome from "../../public/icons/icon-home.svg";
import IconUser from "../../public/icons/icon-user.svg";
import IconLayers from "../../public/icons/icon-layers.svg";
import IconShoppingCart from "../../public/icons/icon-shopping-cart.svg";
import IconCommunity from "../../public/icons/icon-cummunity.svg";
import IconNotification from "../../public/icons/icon-notification.svg";
import IconWarning from "../../public/icons/icon-warning.svg";
import IconClose from "../../public/icons/icon-close.svg";
import IconSearch from "../../public/icons/icon-search.svg";
import IconPlane from "../../public/icons/icon-plane.svg";
import IconGoogle from "../../public/icons/icon-google.svg";
import IconCheck from "../../public/icons/icon-check.svg";
import IconCircle from "../../public/icons/icon-circle.svg";
import IconChat from "../../public/icons/icon-chat.svg";

const Icon = ({ name, size }) => {
  switch (name) {
    case "icon-home":
      return <Image src={IconHome} width={size} height={size} alt={name} />;
      break;
    case "icon-user":
      return <Image src={IconUser} width={size} height={size} alt={name} />;
      break;
    case "icon-layers":
      return <Image src={IconLayers} width={size} height={size} alt={name} />;
      break;
    case "icon-shopping-cart":
      return (
        <Image src={IconShoppingCart} width={size} height={size} alt={name} />
      );
      break;
    case "icon-community":
      return (
        <Image src={IconCommunity} width={size} height={size} alt={name} />
      );
      break;
    case "icon-notification":
      return (
        <Image src={IconNotification} width={size} height={size} alt={name} />
      );
      break;
    case "icon-warning":
      return <Image src={IconWarning} width={size} height={size} alt={name} />;
      break;
    case "icon-close":
      return <Image src={IconClose} width={size} height={size} alt={name} />;
      break;
    case "icon-search":
      return <Image src={IconSearch} width={size} height={size} alt={name} />;
      break;
    case "icon-plane":
      return <Image src={IconPlane} width={size} height={size} alt={name} />;
      break;
    case "icon-google":
      return <Image src={IconGoogle} width={size} height={size} alt={name} />;
      break;
    case "icon-check":
      return <Image src={IconCheck} width={size} height={size} alt={name} />;
      break;
    case "icon-circle":
      return <Image src={IconCircle} width={size} height={size} alt={name} />;
      break;
    case "icon-chat":
      return <Image src={IconChat} width={size} height={size} alt={name} />;
    default:
      return <div>No icon found</div>;
  }
};

export default Icon;
