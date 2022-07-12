//import { useState } from "react";
import Head from "next/head";
import React from "react";
import Layout from "../../components/layout";
import Tweet from "../../components/tweet";
import useUser from "../../lib/useUser";

export default function Home() {
  const { user, isLoading } = useUser();
  return (
    <Layout title="트윗" canGoBack hasSideBar>
      <div className="flex flex-col w-full max-w-2xl mx-auto pb-5">
        <Head>
          <title>트윗</title>
        </Head>
        <div className="flex w-full px-5 py-3">
          <div className="h-12 aspect-square rounded-full bg-gray-300 mr-3" />
          <div>
            <div className="flex">
              <span className="font-bold pr-1 text-[15px] flex items-center">
                Elon Musk
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
            </div>
            <span className="pr-2 text-[15px]">@elonmusk</span>
          </div>
        </div>
        <div className="w-full px-5 pb-3 border-b-[1.5px]">
          <p className="text-xl pb-3">
            Tesla’s automatic cabin overheat protection should make a real
            difference with record heatwaves. Ability to adjust activation
            temperature coming with next software release.
          </p>
          <span className="text-[15px] text-gray-600">
            오전 10:23 · 2022년 7월 12일
          </span>
        </div>
        <div className="py-2 px-5 border-b-[1.5px] text-sm">
          <span className="font-bold">1000</span>
          <span className="text-gray-600 pl-1 pr-3">답글</span>
          <span className="font-bold">1000</span>
          <span className="text-gray-600 pl-1 pr-3">좋아요</span>
        </div>
        <div className="flex justify-evenly text-gray-500 py-2 border-b-[1.5px]">
          <button>
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
          <button>
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
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
