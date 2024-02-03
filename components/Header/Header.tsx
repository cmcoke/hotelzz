/**
 * This file defines the Header component, which is responsible for rendering the
 * navigation bar at the top of the application. It includes links to different
 * sections, user profile information, and a toggle for dark mode. It uses the
 * ThemeContext for managing the dark theme state and the useSession hook from
 * next-auth/react for handling user authentication.
 */

"use client";

import Link from "next/link";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useSession } from "next-auth/react";
import Image from "next/image";

// Import the ThemeContext for managing dark theme state
import ThemeContext from "@/context/themeContext";

const Header = () => {
  // Retrieve dark theme state and setter function from ThemeContext
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  // Retrieve user session data using next-auth
  const { data: session } = useSession();

  // Render the header section with navigation links and user profile information
  return (
    <header className="py-10 px-4 container mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between">
      <div className="flex items-center w-full md:2/3">
        {/* Link to the home page with the application name */}
        <Link href="/" className="font-black text-tertiary-dark">
          Hotelzz
        </Link>

        {/* User profile and dark mode toggle */}
        <ul className="flex items-center ml-5">
          <li className="flex items-center">
            {/* Render user profile or login link based on user session */}
            {session?.user ? (
              <Link href={`/users/${session.user.id}`}>
                {session.user.image ? (
                  // Render user image if available, else default user icon
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image src={session.user.image} alt={session.user.name!} width={40} height={40} className="scale-animation img" />
                  </div>
                ) : (
                  <FaUserCircle className="cursor-pointer" />
                )}
              </Link>
            ) : (
              <Link href="/auth">
                <FaUserCircle className="cursor-pointer" />
              </Link>
            )}
          </li>

          <li className="ml-2">
            {/* Render dark mode toggle based on the current theme */}
            {darkTheme ? (
              <MdOutlineLightMode
                className="cursor-pointer"
                onClick={() => {
                  setDarkTheme(false);
                  localStorage.removeItem("hotel-theme");
                }}
              />
            ) : (
              <MdDarkMode
                className="cursor-pointer"
                onClick={() => {
                  setDarkTheme(true);
                  localStorage.setItem("hotel-theme", "true");
                }}
              />
            )}
          </li>
        </ul>
      </div>

      {/* Navigation links */}
      <ul className="flex items-center justify-between w-full md:w-1/3 mt-4">
        <li className="hover:-translate-y-2 duration-500 transition-all">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:-translate-y-2 duration-500 transition-all">
          <Link href="/rooms">Rooms</Link>
        </li>
        <li className="hover:-translate-y-2 duration-500 transition-all">
          <Link href="/">Contact</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
