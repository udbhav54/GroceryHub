"use client";
import React, { useEffect, useRef, useState } from "react";
import mongoose from "mongoose";
import Link from "next/link";
import Image from "next/image";
import {
  LogOut,
  Package,
  Search,
  ShoppingCartIcon,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { signOut } from "next-auth/react";
interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  role: "user" | "deliveryBoy" | "admin";
  image?: string;
}
function Nav({ user }: { user: IUser }) {
  // console.log(user)

  const [open, setOpen] = useState(false);
  const profileDropDown = useRef<HTMLDivElement>(null);
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileDropDown.current &&
        !profileDropDown.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    // container

    <div className="w-[95%] fixed top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-green-500 to-green-700 rounded-2xl shadow-black/30 flex justify-between items-center h-20 px-4 md:px-8 z-50">
      {/* left section */}
      {/* title */}
      <Link
        href={"/"}
        className="text-white font-extrabold text-2xl sm:text-3xl tracking-wide hover:scale-105 transition-transform"
      >
        GoceryHub
      </Link>

      {/* middel section */}
      {/* search box */}
      <form className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md">
        <Search className="text-gray-500 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Search Groceries..."
          className="w-full outline-none text-gray-700 placeholder-gray-400"
        />
      </form>

      {/* right section */}
      {/* cart */}
      <div className="flex items-center gap-3 md:gap-6 relative">
        <div
          className="bg-white rounded-full w-11 h-11 flex items-center justify-center hover:scale-105 transition"
          onClick={() => {
            setSearchBarOpen((prev) => !prev);
          }}
        >
          <Search className="text-green-600 w-6 h-6" />
        </div>

        <Link
          href={""}
          className="relative bg-white rounded-full w-11 h-11 flex items-center justify-center hover:scale-105 transition"
        >
          <ShoppingCartIcon className="text-green-600 w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold shadow">
            0
          </span>
        </Link>

        {/* profile */}
        <div className="relative" ref={profileDropDown}>
          <div
            className="bg-white rounded-full w-11 h-11 flex items-center justify-center overflow-hidden shadow-md hover:scale-105 transition-transform "
            onClick={() => setOpen((prev) => !prev)}
          >
            {user.image ? (
              <Image
                src={user.image}
                alt="user"
                fill
                className="object-cover rounded-full"
              />
            ) : (
              <User />
            )}
          </div>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 z-50"
              >
                {/* User Info */}
                <div className="flex items-center gap-4 pb-3 border-b border-gray-100">
                  <div className="w-12 h-12 relative rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt="user"
                        fill
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <User className="w-6 h-6 text-green-700" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-gray-900 font-semibold text-sm">
                      {user.name}
                    </div>
                    <div className="text-gray-500 text-xs capitalize">
                      {user.role}
                    </div>
                  </div>
                </div>

                {/* Example Links / Actions */}
                <Link
                  href={""}
                  className="flex items-center gap-2 px-3 py-3 hover:bg-green-50 rounded-lg text-gray-700 font-medium"
                  onClick={() => setOpen(false)}
                >
                  <Package className="w-5 h-5 text-green-600" />
                  My Orders
                </Link>

                <button
                  className="flex items-center gap-2 w-full text-left px-3 py-3 hover:bg-red-50 rounded-lg text-gray-700 font-medium"
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: "/login" });
                  }}
                >
                  <LogOut className="w-5 h-5 text-red-600" />
                  Log Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {searchBarOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-full shadow-lg z-40 flex items-center px-4 py-2"
              >
                <Search className="text-gray-500 w-5 h-5 mr-2" />
                <form className="grow">
                  <input
                    type="text"
                    className="w-full outline-none text-gray-700"
                    placeholder="Search Groceries..."
                  />
                </form>
                <button onClick={() => setSearchBarOpen(false)}>
                  <X className="text-gray-500 w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Nav;
