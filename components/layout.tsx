import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useUser from "../lib/useUser";
import { cls } from "../lib/utils";

interface LayoutProps {
  title?: string;
  verified?: boolean;
  canGoBack?: boolean;
  hasSideBar?: boolean;
  isMine?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  verified,
  canGoBack,
  hasSideBar,
  children,
  isMine,
}: LayoutProps) {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [state, setState] = useState(false);
  const onClick = () => {
    router.back();
  };
  const onLogoutClick = async () => {
    await fetch("/api/logout", { method: "POST" }).then((response) =>
      setState(response.ok)
    );
  };

  function onScrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    if (state) {
      router.push("/");
    }
  }, [state, router]);

  //random background image
  const images = [
    "bg-[url(https://www.ghibli.jp/gallery/umi005.jpg)] bg-left-bottom",
    "bg-[url(https://www.ghibli.jp/gallery/umi032.jpg)] bg-right-bottom",
    "bg-[url(https://www.ghibli.jp/gallery/umi031.jpg)] bg-left-top",
    "bg-[url(https://www.ghibli.jp/images/umi1.jpg)] bg-right-top",
  ];
  const chosenImage = images[Math.floor(Math.random() * images.length)];
  return (
    <div
      className={cls(
        "text-gray-700 bg-fixed bg-[length:25%] bg-gradient-to-b from-indigo-100 to-pink-100"
      )}
    >
      <div className="flex max-w-2xl mx-auto font-arial bg-white min-h-screen">
        <div>
          {hasSideBar ? (
            <nav className="pt-5 space-y-3 bg-white max-w-[30px] flex flex-col items-center w-full px-10 pb-5 pt-3text-xs">
              <Link href="/">
                <a
                  className={cls(
                    "transition-all ease-in-out duration-500 p-3 rounded-full hover:bg-pink-100 fixed flex flex-col items-center space-y-2",
                    router.pathname === "/" ? "text-pink-400" : ""
                  )}
                >
                  {router.pathname === "/" ? (
                    <svg
                      className="w-7 h-7"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  ) : (
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
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  )}
                </a>
              </Link>
              <Link href={`/${user?.userId}`}>
                <a
                  className={cls(
                    "transition-al ease-in-out duration-500 p-3 rounded-full hover:bg-gray-200 fixed top-16 flex flex-col items-center space-y-2",
                    router.pathname === `/user/[id]` && isMine
                      ? "text-pink-400"
                      : ""
                  )}
                >
                  {!(router.pathname === `/user/[id]` && isMine) ? (
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-7 h-7"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </a>
              </Link>
              <Link href="/settings">
                <a
                  className={cls(
                    "transition-all ease-in-out duration-500 p-3 rounded-full hover:bg-gray-200 fixed top-[7.5rem] flex flex-col items-center space-y-2",
                    router.pathname === "/settings" ? "text-pink-400" : ""
                  )}
                >
                  {router.pathname === "/settings" ? (
                    <svg
                      className="w-7 h-7"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </a>
              </Link>
              <button
                onClick={onLogoutClick}
                className="transition-all ease-in-out duration-500 p-3 rounded-full hover:bg-gray-200 fixed top-48 flex flex-col justify-center items-center"
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
        <div className="w-full max-w-2xl mx-auto border-x-[1px]">
          <div
            onClick={onScrollTop}
            className={cls(
              "cursor-pointer bg-white bg-opacity-90 w-full max-w-[36.9rem]  text-xl font-bold py-3 fixed z-10 top-0 flex pl-10 items-center"
            )}
          >
            {canGoBack ? (
              <button
                onClick={onClick}
                className="transition-all ease-in-out duration-300 p-2 rounded-full hover:bg-gray-200 flex flex-col justify-center items-center absolute left-2"
              >
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
              <div className="flex items-center pl-3">
                <span className="font-bold">{title}</span>
                {verified ? (
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
                ) : null}
              </div>
            ) : null}
          </div>
          <div className={cls("pt-14")}>{children}</div>
        </div>
      </div>
    </div>
  );
}
