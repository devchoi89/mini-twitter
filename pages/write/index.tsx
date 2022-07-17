import { Tweet } from "@prisma/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/layout";
import useMutation from "../../lib/useMutation";
import { cls } from "../../lib/utils";

interface onTweetForm {
  tweet: string;
}

interface TweetMutation {
  ok: boolean;
  post: Tweet;
}

export default function Write() {
  const router = useRouter();
  const { register, watch, handleSubmit } = useForm<onTweetForm>({
    mode: "onChange",
  });

  const [mutation, { loading, data }] =
    useMutation<TweetMutation>("/api/write/");
  const onHandleTweet = async (onValidForm: onTweetForm) => {
    if (loading) return;
    mutation(onValidForm);
  };

  useEffect(() => {
    if (data && data?.ok) {
      router.push(`/tweet/${data?.post?.id}`);
    }
  }, [data, router]);

  return (
    <Layout title="글쓰기" canGoBack hasSideBar>
      <Head>
        <title>글쓰기 / 가벼운 트위터</title>
      </Head>
      <form
        onSubmit={handleSubmit(onHandleTweet)}
        className="max-w-2xl mx-auto pt-5 px-5"
      >
        <textarea
          {...register("tweet", {
            required: true,
            maxLength: { message: "글자수는 140자로 제한됩니다", value: 140 },
            minLength: { message: "1자 이상 써주세요", value: 1 },
          })}
          required
          placeholder="트윗 내용"
          className={cls(
            "w-full h-52 p-2 border-2 border-white rounded-md bg-gray-200 focus:bg-white",
            watch("tweet")?.length > 140
              ? " focus:outline-red-500  border-red-500"
              : ""
          )}
        ></textarea>
        <div className="mb-2 flex justify-end">
          <span
            className={cls(
              "pr-1",
              watch("tweet")?.length > 140 ? "text-red-500" : ""
            )}
          >
            {watch("tweet")?.length}
          </span>
          <span className="font-sm text-sm">/140</span>
        </div>
        <button
          type="submit"
          className={cls(
            "w-full cursor-pointer text-white font-bold bg-gray-800 hover:opacity-80 p-2 rounded-md",
            watch("tweet")?.length > 140 ? "bg-opacity-50" : ""
          )}
        >
          트윗하기
        </button>
      </form>
    </Layout>
  );
}
