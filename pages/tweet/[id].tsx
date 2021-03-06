//import { useState } from "react";
import { Tweet, User } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import Layout from "../../components/layout";
import TweetRow from "../../components/tweet";
import twitterDate from "../../lib/twitterDate";
import useMutation from "../../lib/useMutation";
import useUser from "../../lib/useUser";

interface TweetWithCount extends Tweet {
  _count: {
    favs: number;
    answers: number;
  };
  user: User;
  favs: [{ userId: any }];
}

interface TweetDetailResponse {
  ok: boolean;
  tweet: TweetWithCount;
  replies: TweetWithCount[];
  isTweetLiked: boolean;
}

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  const { data, mutate } = useSWR<TweetDetailResponse>(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );
  const [mutation, { loading }] = useMutation("/api/like");
  const [deleteMutation, { loading: deleteLoading }] =
    useMutation("/api/delete");

  async function onMainLike(tweetId: any) {
    if (loading) return;
    await mutation(tweetId);
    if (!data) return;
    mutate(
      {
        ...data,
        tweet: {
          ...data?.tweet,
          _count: {
            ...data?.tweet?._count,
            favs: data?.isTweetLiked
              ? data?.tweet?._count?.favs - 1
              : data?.tweet?._count?.favs + 1,
          },
        },
        isTweetLiked: !data?.isTweetLiked,
      },
      false
    );
  }

  function onLike(tweetId: any) {
    if (loading) return;
    mutation(tweetId);
    if (!data) return;
    //data를 수정된 newData로 바꾼다.
    /*     let index = data?.replies.findIndex((reply) => reply.id == tweetId);
    let value = Boolean(data?.replies[index]?.favs[0]?.userId === user?.id);
    let newData = data;
    if (value) {
      newData.replies[index].favs[0] = { userId: 0 };
      newData.replies[index]._count.favs -= 1;
    } else {
      newData.replies[index].favs[0] = { userId: user?.id };
      newData.replies[index]._count.favs += 1;
    } 
    mutate(
      {
        ...data,
        tweets: newData.tweets,
      },
      false
    );
    */
    mutate(
      {
        ...data,
        replies: data?.replies?.map((reply) =>
          reply.id === tweetId
            ? {
                ...reply,
                favs: [
                  reply?.favs[0]?.userId === user?.id
                    ? { userId: 0 }
                    : { userId: user?.id },
                ],
                _count: {
                  ...reply?._count,
                  favs:
                    reply?.favs[0]?.userId === user?.id
                      ? reply?._count.favs - 1
                      : reply?._count.favs + 1,
                },
              }
            : reply
        ),
      },
      false
    );
  }

  function onMainDeleteClick(tweetId: any) {
    if (deleteLoading) return;
    if (confirm("정말로 트윗을 지우시겠습니까?")) {
      deleteMutation(tweetId);
      alert("트윗이 삭제되었습니다.");
      if (!data) return;
      router.push(`/${user?.userId}`);
    } else {
    }
  }

  function onDeleteClick(tweetId: any) {
    if (deleteLoading) return;
    if (confirm("정말로 트윗을 지우시겠습니까?")) {
      deleteMutation(tweetId);
      alert("트윗이 삭제되었습니다.");
      if (!data) return;
      mutate(
        { ...data, replies: data?.replies.filter((row) => row.id !== tweetId) },
        false
      );
    } else {
    }
  }

  //const date = data?.tweet?.createdAt.toString();
  /*if (date) {
    const parsedDate = console.log(Date.parse(date.substring(0, 10)));

    const finalDate = new Date(date);
    console.log(finalDate.getHours());
  } */

  return (
    <Layout title="트윗" canGoBack hasSideBar>
      <div className="flex flex-col w-full max-w-2xl mx-auto pb-5">
        <Head>
          <title>트윗 / 가벼운 트위터</title>
        </Head>
        {user?.id === data?.tweet?.userId ? (
          <div className="flex justify-end pr-5">
            <button
              onClick={() => onMainDeleteClick(data?.tweet?.id)}
              className="flex justify-center items-center absolute z-[10] h-6 w-6 rounded-md hover:border-[2px] hover:text-red-500 hover:bg-white  text-gray-500"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : null}

        <div className="flex w-full px-5 py-3">
          <Link href={`/${data?.tweet?.user?.userId}`}>
            <img
              src={`${data?.tweet?.user?.badge}`}
              className="cursor-pointer object-cover object-center h-12 aspect-square rounded-full bg-gray-300 mr-3"
            />
          </Link>
          <div>
            <div className="flex">
              <span className="font-bold pr-1 text-[15px] flex items-center">
                <span className="hover:underline">
                  <Link href={`/${data?.tweet?.user?.userId}`}>
                    <span className=" text-gray-700 cursor-pointer">
                      {data?.tweet?.user?.name}
                    </span>
                  </Link>
                </span>
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
            <span className="text-gray-700 pr-2 text-[15px]">
              @{data?.tweet?.user?.userId}
            </span>
          </div>
        </div>
        <div className="w-full px-5 pb-3 border-b-[1.5px]">
          <pre className="text-2xl whitespace-pre-wrap space-y-1 mb-3">
            {data?.tweet?.tweet}
          </pre>
          {data?.tweet?.image ? (
            <img
              className="max-h-96 w-auto  my-3 border-[1px] border-gray-300 rounded-lg"
              src={`${data?.tweet?.image}`}
            />
          ) : null}
          <span className="text-[15px] text-gray-600">
            {twitterDate(data?.tweet?.createdAt?.toString(), "detail")}
          </span>
        </div>
        <div className="py-2 px-5 border-b-[1.5px] text-sm">
          <span className="font-bold">{data?.tweet?._count?.answers}</span>
          <span className="text-gray-600 pl-1 pr-3">답글</span>
          <span className="font-bold">{data?.tweet?._count?.favs}</span>
          <span className="text-gray-600 pl-1 pr-3">좋아요</span>
        </div>
        <div className="flex justify-evenly text-gray-500 py-1 border-b-[1.5px]">
          <Link href={`/write/${data?.tweet?.id}`}>
            <button className="transition-all ease-in-out duration-300 p-2 rounded-full hover:bg-pink-100 hover:text-pink-500">
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
          </Link>
          <button
            onClick={() => onMainLike(data?.tweet?.id)}
            className="transition-all ease-in-out duration-300 p-2 rounded-full hover:bg-red-100 hover:text-red-500"
          >
            {data?.isTweetLiked ? (
              <svg
                className="w-6 h-6 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
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
            )}
          </button>
        </div>
        <div className="divide-y-[1px]">
          {data?.replies.map((reply) => (
            <TweetRow
              image={reply?.image}
              badge={`${reply?.user?.badge}`}
              ondeleteclick={() => onDeleteClick(reply?.id)}
              isMyTweet={user?.id === reply?.userId}
              onclick={() => onLike(reply?.id)}
              isLiked={user?.id === reply?.favs[0]?.userId}
              key={reply?.id}
              id={reply?.id}
              name={reply?.user?.name}
              userId={reply?.user?.userId}
              time={twitterDate(reply?.createdAt?.toString(), "list")}
              favs={reply?._count?.favs}
              answers={reply?._count?.answers}
              tweet={reply?.tweet}
            ></TweetRow>
          ))}
        </div>
      </div>
    </Layout>
  );
}
