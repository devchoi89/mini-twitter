import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { cls } from "../lib/utils";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasSideBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  canGoBack,
  hasSideBar,
  children,
}: LayoutProps) {
  const router = useRouter();
  const [state, setState] = useState(false);
  const onClick = () => {
    router.back();
  };
  const onLogoutClick = async () => {
    await fetch("/api/logout", { method: "POST" }).then((response) =>
      setState(response.ok)
    );
  };
  useEffect(() => {
    if (state) {
      router.push("/");
    }
  }, [state, router]);
  return (
    <div className="flex max-w-xl mx-auto">
      <div>
        {hasSideBar ? (
          <nav className="pt-5 space-y-3 bg-white max-w-[30px] flex flex-col items-center text-gray-700 w-full px-10 pb-5 pt-3text-xs">
            <Link href="/">
              <a className="transition-all ease-in-out duration-500 p-3 rounded-full hover:bg-gray-100 fixed flex flex-col items-center space-y-2">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
              </a>
            </Link>
            <Link href="/">
              <a className="transition-all ease-in-out duration-500 p-3 rounded-full hover:bg-gray-100 fixed top-16 flex flex-col items-center space-y-2">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </a>
            </Link>
            <button
              onClick={onLogoutClick}
              className="transition-all ease-in-out duration-500 p-3 rounded-full hover:bg-gray-100 fixed top-[7.5rem] flex flex-col justify-center items-center"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </nav>
        ) : null}
      </div>
      <div className="w-full max-w-lg mx-auto border-x-[1px]">
        <div
          className={cls(
            "bg-white bg-opacity-90 w-full max-w-lg  text-xl font-bold py-2 fixed z-10 text-gray-700 top-0 flex pl-10 items-center"
          )}
        >
          {canGoBack ? (
            <button onClick={onClick} className="absolute left-1">
              <span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </span>
            </button>
          ) : null}
          {title ? (
            <div className="flex items-center">
              <span className="font-bold">{title}</span>
              <span className="pt-1 pl-1 text-sky-500">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          ) : null}
        </div>
        <div className={cls("pt-11")}>{children}</div>
      </div>
    </div>
  );
}
