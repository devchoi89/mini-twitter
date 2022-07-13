//import { useState } from "react";
import { Tweet, User } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import Layout from "../../components/layout";
import TweetRow from "../../components/tweet";
import useMutation from "../../lib/useMutation";
import useUser from "../../lib/useUser";

interface TweetsWithUser extends Tweet {
  _count: {
    favs: number;
    answers: number;
  };
  favs: [{ userId: number }];
  user: User;
}

interface UserTweetsResponse {
  ok: boolean;
  tweets: TweetsWithUser[];
  findUser: User;
}

export default function Home() {
  const router = useRouter();
  const { data } = useSWR<UserTweetsResponse>(
    router.query.id ? `/api/profile/${router.query.id}` : null
  );
  const { mutate } = useSWRConfig();
  const [mutation, { data: likeData, loading }] = useMutation("/api/like");
  const [isMine, setIsMine] = useState(false);
  const headTitle = `${data?.findUser?.name}님의 트위터`;
  const { user } = useUser();
  useEffect(() => {
    setIsMine(router.query.id === user?.userId);
  }, [router.query, user]);

  async function onLike(tweetId: any) {
    console.log(tweetId);
    if (loading) return;
    await mutation(tweetId);
    mutate(`/api/profile/${router.query.id}`);
  }

  return (
    <Layout title={data?.findUser?.name} verified canGoBack hasSideBar>
      <div className="flex flex-col w-full max-w-2xl mx-auto pb-5">
        <Head>
          <title>{headTitle}</title>
        </Head>
        <div className="h-32 w-full bg-pink-300 flex justify-end items-start"></div>

        <div className="px-5">
          <div className="w-24 aspect-square rounded-full border-4 border-white bg-gray-300 absolute top-32" />
          <div className="flex justify-end pt-3 pb-7 items-center">
            {isMine ? (
              <Link href="/write">
                <button className="transition-all ease-in-out delay-50 border text-pink-400 border-pink-400 hover:bg-pink-300 hover:border-white hover:text-white py-1 px-4 rounded-r-full rounded-l-full text-sm font-bold duration-300">
                  <span>글쓰기</span>
                </button>
              </Link>
            ) : (
              <button className="transition-all ease-in-out delay-50 border   bg-teal-400 text-white hover:bg-sky-400 border-white hover:border-sky-400 py-1 px-4 rounded-r-full rounded-l-full text-sm font-bold duration-300">
                <span>팔로우</span>
              </button>
            )}
          </div>
          <h1 className="font-bold text-2xl">{data?.findUser?.name}</h1>
          <h1 className="text-gray-400">@{data?.findUser?.userId}</h1>
          <h1 className="text-sm pt-3 pb-5">
            가입일: {data?.findUser?.createAt?.toString()}
          </h1>
          <div>
            <div></div>
          </div>
        </div>
        <div className="divide-y-[1px]">
          {data?.tweets
            ?.slice(0)
            .reverse()
            .map((tweet) => (
              <TweetRow
                onclick={() => onLike(tweet?.id)}
                isLiked={user?.id === tweet?.favs[0]?.userId}
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
