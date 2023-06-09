import { FC, useState } from "react";
import { AiOutlineUser, AiFillEdit } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import defaultUser from "../../public/images/default-user.png";

interface NavProps {
  dark: boolean;
  setDark: () => void;
}

const Nav: FC<NavProps> = ({ dark, setDark }) => {
  const { data: session } = useSession();
  const [nav, setNav] = useState(false);
  return (
    // Desktop Navbar
    <nav className="max-w-5xl mx-auto border-b border-b-gray-400">
      <div className="w-full flex justify-between items-center py-2 px-4">
        <div>
          <Link href={"/"}>
            <h1 className="text-4xl font-semibold text-gray-800 dark:text-white hover:animate-pulse">
              Project Stage
            </h1>
          </Link>
        </div>
        <div className="block z-50 md:hidden">
          <RxHamburgerMenu
            size={24}
            onClick={() => setNav(!nav)}
            className="text-gray-900 cursor-pointer dark:text-white"
          />
        </div>
        <ul className="hidden gap-5 md:flex">
          {session ? (
            <>
              <li>
                <div className="flex items-center gap-2">
                  <img
                    src={session.user?.image || defaultUser.src}
                    alt={`${session.user?.name ?? "User"} Profile Picture`}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-sky-500 aspect-square object-cover"
                  />

                  <p className="text-lg font-medium dark:text-white">
                    {session.user?.name}
                  </p>
                </div>
              </li>
              <li>
                <button
                  className="flex items-center justify-center gap-1 text-white font-medium bg-sky-300 py-2 px-4 rounded-md  outline-2 outline transition-all duration-200 ease-linear outline-sky-300 hover:outline-offset-2 dark:bg-sky-500 dark:outline-sky-500"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <FiLogOut />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  className="flex items-center justify-center gap-1 text-white font-medium bg-sky-300 py-2 px-4 rounded-md outline-2 outline transition-all duration-200 ease-linear outline-sky-300 hover:outline-offset-2 dark:bg-sky-500 dark:outline-sky-500"
                  onClick={() => signIn()}
                >
                  <AiOutlineUser />
                  Sign In
                </button>
              </li>
              <li>
                <Link href={"/register"}>
                  <button className="flex items-center justify-center gap-1 text-white font-medium bg-sky-300 py-2 px-4 rounded-md outline-2 outline transition-all duration-200 ease-linear outline-sky-300 hover:outline-offset-2 dark:bg-sky-500 dark:outline-sky-500">
                    <AiFillEdit />
                    Sign Up
                  </button>
                </Link>
              </li>
            </>
          )}
          <li>
            <button
              className="flex items-center justify-center gap-1 text-white font-medium bg-sky-300 py-2 px-4 rounded-md outline-2 outline transition-all duration-200 ease-linear outline-sky-300 hover:outline-offset-2 dark:bg-sky-500 dark:outline-sky-500"
              onClick={setDark}
            >
              {dark ? (
                <>
                  <FaSun />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <FaMoon />
                  <span>Dark</span>
                </>
              )}
            </button>
          </li>
        </ul>
      </div>
      {/* Mobile Sidebar */}
      <div
        className={`${
          nav ? "fixed" : "fixed right-[-100%]"
        } right-0 top-0 z-10 w-[50%] h-full border-l border-l-400 bg-white duration-200 ease-in-out md:hidden dark:bg-zinc-950`}
      >
        <div className="pt-16 px-2">
          <ul>
            {session ? (
              <>
                {session.user?.name && (
                  <li className="flex items-center justify-end gap-1 text-2xl pr-4 pb-1 border-b mb-6 font-medium  dark:text-white">
                    <img
                      src={session.user?.image || defaultUser.src}
                      alt={`${session.user?.name ?? "User"} Profile Picture`}
                      width={40}
                      height={40}
                      className="rounded-full border-2  aspect-square object-cover"
                    />
                    {session.user?.name}
                  </li>
                )}
                <li
                  className="flex items-center justify-end gap-1 text-2xl pr-4 pb-1 border-b mb-6 font-medium  cursor-pointer dark:text-white"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <FiLogOut />
                  Logout
                </li>
              </>
            ) : (
              <>
                <Link href={"/register"} onClick={() => setNav(false)}>
                  <li className="flex items-center justify-end gap-1 text-2xl pr-4 pb-1 border-b mb-6 font-medium  dark:text-white">
                    <AiOutlineUser />
                    Sign Up
                  </li>
                </Link>
                <li
                  className="flex items-center justify-end gap-1 text-2xl pr-4 pb-1 border-b mb-6 font-medium  dark:text-white"
                  onClick={() => signIn()}
                >
                  <AiFillEdit />
                  Sign In
                </li>
              </>
            )}
            <li
              className="flex items-center justify-end gap-1 text-2xl pr-4 pb-1 border-b mb-6 font-medium cursor-pointer dark:text-white"
              onClick={setDark}
            >
              {dark ? (
                <>
                  <FaSun /> Light
                </>
              ) : (
                <>
                  <FaMoon /> Dark
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
