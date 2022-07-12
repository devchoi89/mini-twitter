//import { useState } from "react";
import { Tweet, User } from "@prisma/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import Layout from "../../components/layout";
import TweetRow from "../../components/tweet";

interface TweetsWithUser extends Tweet {
  _count: {
    favs: number;
    answers: number;
  };
  user: User;
}

interface UserTweetsResponse {
  ok: boolean;
  tweets: TweetsWithUser[];
  user: User;
}

export default function Home() {
  const router = useRouter();
  const { data } = useSWR<UserTweetsResponse>(
    router.query.id ? `/api/profile/${router.query.id}` : null
  );
  const headTitle = `${data?.user?.name}님의 트위터`;
  return (
    <Layout title={data?.user?.name} verified canGoBack hasSideBar>
      <div className="flex flex-col w-full max-w-2xl mx-auto pb-5">
        <Head>
          <title>{headTitle}</title>
        </Head>
        <div className="h-32 w-full bg-pink-300 flex justify-end items-start"></div>

        <div className="px-5">
          <div className="w-24 aspect-square rounded-full border-4 border-white bg-gray-300 absolute top-32" />
          <div className="flex justify-end pt-3 pb-7 items-center">
            <button className="transition-all ease-in-out delay-50 border text-pink-400 border-pink-400 hover:bg-pink-300 hover:border-white hover:text-white py-1 px-4 rounded-r-full rounded-l-full text-sm font-bold duration-300">
              <span>글쓰기</span>
            </button>
          </div>
          <h1 className="font-bold text-2xl">{data?.user?.name}</h1>
          <h1 className="text-gray-400">@{data?.user?.userId}</h1>
          <h1 className="text-sm pt-3 pb-5">
            가입일: {data?.user?.createAt?.toString()}
          </h1>
          <div>
            <div></div>
          </div>
        </div>
        <div className="divide-y-[1px]">
          {data?.tweets?.map((tweet) => (
            <TweetRow
              key={tweet?.id}
              id={tweet?.id}
              name={tweet?.user?.name}
              userId={tweet?.user?.userId}
              time={tweet?.createdAt.toString()}
              favs={tweet?._count?.favs}
              answers={tweet?._count?.answers}
              tweet={tweet?.tweet}
            ></TweetRow>
          ))}
        </div>
      </div>
    </Layout>
  );
}
