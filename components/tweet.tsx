//import { Tweet, User } from "@prisma/client";
import Link from "next/link";
//import useSWR, { useSWRConfig } from "swr";
//import useMutation from "../lib/useMutation";
//import useUser from "../lib/useUser";

/* export function twitterDate(date: any) {
  if (!date) return;
  const ampm = Number(date?.substring(11, 13)) > 11 ? "오후" : "오전";
  const hour =
    date?.substring(11, 13) % 12 === 0 ? 12 : date?.substring(11, 13) % 12;
  const minute = date.substring(14, 16);
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);
  const changedDate = `${ampm} ${hour}:${minute} · ${year}년 ${month}월 ${day}일`;

  return changedDate;
} */

interface TweetProps {
  name: string;
  userId: string;
  badge: string;
  time: any;
  tweet: string;
  image?: any;
  id: number;
  favs: number;
  answers: number;
  onclick: any;
  ondeleteclick: any;
  isLiked: boolean;
  isMyTweet: boolean;
}

/* interface TweetWithCount extends Tweet {
  _count: {
    favs: number;
    answers: number;
  };
  user: User;
  favs: [{ userId: number }];
}

interface TweetDetailResponse {
  ok: boolean;
  tweet: TweetWithCount;
  replies: TweetWithCount[];
} */

export default function TweetRow({
  name,
  userId,
  badge,
  time,
  tweet,
  image,
  id,
  favs,
  answers,
  onclick,
  ondeleteclick,
  isLiked,
  isMyTweet,
}: TweetProps) {
  /*   const [mutation, { data, loading }] = useMutation("/api/like");
  const { mutate } = useSWRConfig();
  const { data: tweetData, mutate: boundMutate } = useSWR<TweetDetailResponse>(
    `/api/tweets/${id}`
  ); */

  /*   function onLike(tweetId: any) {
    if (loading) return;
    mutation(tweetId);
    if (!tweetData) return;
    console.log(`/api/tweets/${id}`);
    mutate(`/api/tweets/${id}`);
  } */
  return (
    <Link href={`/tweet/${id}`}>
      <div className="transition-all ease-in-out duration-300 cursor-pointer  px-5 pt-3 hover:bg-sky-50">
        <div className="flex justify-end">
          <Link href="javascript:;">
            {isMyTweet ? (
              <button
                onClick={ondeleteclick}
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
            ) : (
              <></>
            )}
          </Link>
        </div>
        <div className=" flex w-full">
          <Link href={`/${userId}`}>
            <img
              src={badge}
              className="h-12 aspect-square rounded-full object-cover object-center bg-gray-200 mr-3"
            />
          </Link>
          <div className="relative flex flex-col">
            <div className="flex relative w-full">
              <span className="font-bold pr-1 text-[15px] flex items-center">
                <Link href={`/${userId}`}>
                  <a className=" text-gray-700 hover:underline">{name}</a>
                </Link>
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
              <Link href={`/${userId}`}>
                <span className="pr-2 text-[15px]">@{userId}</span>
              </Link>
              <span className="text-[15px]">· {time}</span>
            </div>
            <pre className="text-[15px] whitespace-pre-wrap">{tweet}</pre>
            {image ? (
              <img
                className="max-h-96 w-auto  mt-3 border-[1px] border-gray-300 rounded-lg"
                src={`${image}`}
              />
            ) : null}
          </div>
        </div>
        <div className="flex justify-evenly  items-center pb-1 text-gray-500">
          <div className="flex items-center">
            <Link href={`/write/${id}`}>
              <button className="transition-all ease-in-out duration-300 p-2 rounded-full hover:bg-pink-100 hover:text-pink-400 flex items-center">
                <svg
                  className="w-5 h-5"
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
            <span className="text-sm">{answers}</span>
          </div>
          <div className="flex items-center">
            <Link href="javascript:;">
              <button
                onClick={onclick}
                className="transition-all ease-in-out duration-300 p-2 rounded-full hover:bg-red-100 hover:text-red-500 flex items-center"
              >
                {isLiked ? (
                  <svg
                    className="w-5 h-5  text-red-500"
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
                    className="w-5 h-5"
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
            </Link>
            <span className="text-sm">{favs}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
