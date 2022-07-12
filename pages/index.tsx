//import { useState } from "react";
import { Tweet, User } from "@prisma/client";
import Head from "next/head";
import React from "react";
import useSWR from "swr";
import Layout from "../components/layout";
import TweetRow from "../components/tweet";

interface TweetWithCount extends Tweet {
  _count: {
    favs: number;
    answers: number;
  };
  user: User;
}

interface TweetsResponse {
  ok: boolean;
  tweets: TweetWithCount[];
}

export default function Home() {
  const { data } = useSWR<TweetsResponse>("/api/tweets");
  return (
    <Layout title="모든 트윗" canGoBack hasSideBar>
      <div className="flex flex-col w-full max-w-2xl mx-auto pb-5">
        <Head>
          <title>홈</title>
        </Head>
        <div className="divide-y-[1px]">
          {data?.tweets.map((tweet) => (
            <TweetRow
              key={tweet?.id}
              id={tweet?.id}
              name={tweet?.user.name}
              userId={tweet?.user.userId}
              time={tweet?.createdAt.toString()}
              tweet={tweet?.tweet}
              favs={tweet?._count.favs}
              answers={tweet?._count.answers}
            ></TweetRow>
          ))}
        </div>
      </div>
    </Layout>
  );
}
