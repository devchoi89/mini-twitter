//import { useState } from "react";
import Head from "next/head";
import React from "react";
import Layout from "../components/layout";
import Tweet from "../components/tweet";
import useUser from "../lib/useUser";

export default function Home() {
  const { user, isLoading } = useUser();
  return (
    <Layout title="모든 트윗" canGoBack hasSideBar>
      <div className="flex flex-col w-full max-w-2xl mx-auto pb-5">
        <Head>
          <title>홈</title>
        </Head>
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
