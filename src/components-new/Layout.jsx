import ChatbotLayout from "@/components/ChatbotLayout";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="relative">
      <h1>Hello</h1>
      <div
        className="
        fixed
        left-0
        bottom-0
        w-full
        h-full
        bg-image-content 
        bg-no-repeat 
        bg-center 
        bg-cover
        overflow-auto
        !z-0
        opacity-40
      "
      ></div>
      <Sidebar />
      <main className="relative w-[calc(100%_-_213px)] ml-[213px] z-20">
        <Navbar />
        <div className="px-[20px] md:pl-[100px] md:pr-[29px]">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
