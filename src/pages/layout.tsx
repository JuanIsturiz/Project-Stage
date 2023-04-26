import { FC, useState } from "react";
import { Urbanist } from "next/font/google";
import Nav from "@/components/Nav";
import { useRouter } from "next/router";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const urbanist = Urbanist({
  subsets: ["latin"],
});

const Layout: FC<LayoutProps> = ({ children }) => {
  const { pathname } = useRouter();
  const [dark, setDark] = useState(false);
  return (
    <main
      className={`${urbanist.className} ${
        dark ? "dark bg-zinc-950" : ""
      } min-h-screen text-gray-800 transition-colors duration-200`}
    >
      <Nav dark={dark} setDark={() => void setDark(!dark)} />
      {children}
    </main>
  );
};

export default Layout;
