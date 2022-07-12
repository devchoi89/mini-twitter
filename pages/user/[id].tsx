//import { useState } from "react";
import Head from "next/head";
import React from "react";
import Layout from "../../components/layout";
import Tweet from "../../components/tweet";
import useUser from "../../lib/useUser";

export default function Home() {
  const { user, isLoading } = useUser();
  return (
    <Layout title={user?.name} verified canGoBack hasSideBar>
      <div className="flex flex-col w-full max-w-2xl mx-auto pb-5">
        <Head>
          <title>{user?.name}님의 트위터</title>
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
            <Tweet
              key={i}
              id={1}
              name={user?.name}
              userId={user?.userId}
              time={"5시간"}
              tweet={
                "These polar launches will enable complete coverage of Earth (where approved by local government)"
              }
            ></Tweet>
          ))}
        </div>
      </div>
    </Layout>
  );
}
