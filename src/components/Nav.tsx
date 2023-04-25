import { FC, useState } from "react";
import { AiOutlineUser, AiFillEdit } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
const session = false;

interface NavProps {
  dark: boolean;
  setDark: () => void;
}

const Nav: FC<NavProps> = ({ dark, setDark }) => {
  const [nav, setNav] = useState(false);
  return (
    <nav className="max-w-5xl mx-auto border-b border-b-gray-400 mb-16 md:mb-32">
      <div className="w-full flex justify-between items-center py-2 px-4">
        <div>
          <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
            Project Stage
          </h1>
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
            <li>
              <button className="flex items-center justify-center gap-1 text-white font-medium bg-sky-300 py-2 px-4 rounded-md hover:bg-sky-400 dark:bg-sky-500 dark:hover:bg-sky-600">
                <FiLogOut />
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <button className="flex items-center justify-center gap-1 text-white font-medium bg-sky-300 py-2 px-4 rounded-md hover:bg-sky-400 dark:bg-sky-500 dark:hover:bg-sky-600">
                  <AiOutlineUser />
                  Sign In
                </button>
              </li>
              <li>
                <button className="flex items-center justify-center gap-1 text-white font-medium bg-sky-300 py-2 px-4 rounded-md hover:bg-sky-400 dark:bg-sky-500 dark:hover:bg-sky-600">
                  <AiFillEdit />
                  Sign Up
                </button>
              </li>
            </>
          )}
          <li>
            <button
              className="flex items-center justify-center gap-1 text-white font-medium bg-sky-300 py-2 px-4 rounded-md hover:bg-sky-400 dark:bg-sky-500 dark:hover:bg-sky-600"
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
      <div
        className={`${
          nav ? "fixed" : "fixed right-[-100%]"
        } right-0 top-0 z-10 w-[50%] h-full border-l border-l-400 bg-white duration-200 ease-in-out md:hidden dark:bg-zinc-950`}
      >
        <div className="pt-16 px-2">
          <ul>
            {session ? (
              <li className="flex items-center justify-end gap-1 text-2xl pr-4 pb-1 border-b mb-6 font-medium  dark:text-white">
                <FiLogOut />
                Logout
              </li>
            ) : (
              <>
                <li className="flex items-center justify-end gap-1 text-2xl pr-4 pb-1 border-b mb-6 font-medium  dark:text-white">
                  <AiOutlineUser />
                  Sign Up
                </li>
                <li className="flex items-center justify-end gap-1 text-2xl pr-4 pb-1 border-b mb-6 font-medium  dark:text-white">
                  <AiFillEdit />
                  Sign In
                </li>
              </>
            )}
            <li
              className="flex items-center justify-end gap-1 text-2xl pr-4 pb-1 border-b mb-6 font-medium cursor-pointer  dark:text-white"
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