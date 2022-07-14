import { Tweet, User } from "@prisma/client";
import Head from "next/head";
import React from "react";
import useSWR from "swr";
import Layout from "../components/layout";
import TweetRow from "../components/tweet";
import useMutation from "../lib/useMutation";
import useUser from "../lib/useUser";

interface TweetWithCount extends Tweet {
  _count: {
    favs: number;
    answers: number;
  };
  user: User;
  favs: [{ userId: number }];
}

interface TweetsResponse {
  ok: boolean;
  tweets: TweetWithCount[];
}

export default function Home() {
  const { data, mutate } = useSWR<TweetsResponse>("/api/tweets");
  const { user } = useUser();
  const [mutation, { loading }] = useMutation("/api/like");

  async function onLike(tweetId: any) {
    if (loading) return;
    await mutation(tweetId);
    if (!data) return;
    /*     let index = data?.tweets.findIndex((reply) => reply.id == tweetId);
    let value = Boolean(data?.tweets[index]?.favs[0]?.userId === user?.id);
    let newData = data;
    if (value) {
      newData.tweets[index].favs[0] = { userId: 0 };
      newData.tweets[index]._count.favs -= 1;
    } else {
      newData.tweets[index].favs[0] = { userId: user?.id };
      newData.tweets[index]._count.favs += 1;
    }
    mutate(
      {
        ...data,
        tweets: newData.tweets,
      },
      false
    ); */
    mutate(
      {
        ...data,
        tweets: data?.tweets?.map((reply) =>
          reply.id === tweetId
            ? {
                ...reply,
                favs: [
                  reply?.favs[0]?.userId === user?.id
                    ? { userId: 0 }
                    : { userId: 2 },
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

  async function onDeleteClick(tweetId: any) {
    console.log(tweetId);
  }

  return (
    <Layout title="모든 트윗" canGoBack hasSideBar>
      <div className="flex flex-col w-full max-w-2xl mx-auto pb-5">
        <Head>
          <title>홈</title>
        </Head>
        <div className="divide-y-[1px]">
          {data?.tweets
            .slice(0)
            .reverse()
            .map((tweet) => (
              <TweetRow
                ondeleteclick={() => onDeleteClick(tweet?.id)}
                isMyTweet={user?.id === tweet?.userId}
                onclick={() => onLike(tweet?.id)}
                isLiked={user?.id === tweet?.favs[0]?.userId}
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
