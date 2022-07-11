//import { useState } from "react";
import Head from "next/head";
import React from "react";
import Layout from "../components/layout";
import useUser from "../lib/useUser";

export default function Home() {
  const { user, isLoading } = useUser();
  return (
    <Layout title={user?.name} canGoBack hasSideBar>
      <div className="flex flex-col w-full max-w-lg mx-auto pb-5">
        <Head>
          <title>홈</title>
        </Head>
        <div className="h-32 w-full bg-pink-300 flex justify-end items-start"></div>

        <div className="px-5">
          <div className="w-24 aspect-square rounded-full border-4 border-white bg-gray-300 absolute top-32" />
          <div className="flex justify-end pt-3 pb-7 items-center">
            <button className="transition-all ease-in-out delay-50 border text-pink-400 border-pink-400 hover:bg-pink-300 hover:border-white hover:text-white py-1 px-4 rounded-r-full rounded-l-full text-sm font-bold duration-300">
              <span>글쓰기</span>
            </button>
          </div>
          <h1 className="font-bold text-2xl">{user?.name}</h1>
          <h1 className="text-gray-400">@{user?.userId}</h1>
          <h1 className="text-sm pt-3 pb-5">
            가입일: {user?.createAt?.toString()}
          </h1>
          <div>
            <div></div>
          </div>
        </div>
        <div className="divide-y-[1px]">
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
            <div key={i} className="flex w-full px-5 py-3">
              <div className="h-12 aspect-square rounded-full bg-gray-300 mr-3" />
              <div>
                <div className="flex">
                  <span className="font-bold pr-1 text-[15px] flex items-center">
                    {user?.name}
                    <svg
                      className="w-5 h-5 ml-[2px] mt-[2px] text-sky-500"
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
                  <span className="pr-2 text-[15px]">@{user?.userId}</span>
                  <span className="text-[15px]">· 5시간</span>
                </div>
                <p className="text-[15px]">
                  These polar launches will enable complete coverage of Earth
                  (where approved by local government)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
