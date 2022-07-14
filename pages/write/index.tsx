import { Tweet } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import Layout from "../../components/layout";
import useMutation from "../../lib/useMutation";

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
          className="w-full h-52 p-2"
        ></textarea>
        <Button text="트윗하기"></Button>
      </form>
    </Layout>
  );
}
