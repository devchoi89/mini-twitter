import Head from "next/head";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import Layout from "../../components/layout";
import useMutation from "../../lib/useMutation";
import useUser from "../../lib/useUser";
import { cls } from "../../lib/utils";

interface onSettingsForm {
  banner: string;
  badge: string;
  intro: string;
}

interface UrlState {
  bannerUrl: string;
  badgeUrl: string;
  introText: string;
}

export default function Setting() {
  const [urlState, setUrlState] = useState<UrlState>({
    bannerUrl: " ",
    badgeUrl: " ",
    introText: " ",
  });
  const { user } = useUser();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<onSettingsForm>({
    mode: "onChange",
  });
  const [mutation, { loading }] = useMutation("/api/settings");

  useEffect(() => {
    if (user) {
      setUrlState({
        bannerUrl: user?.banner,
        badgeUrl: user?.badge,
        introText: user?.intro,
      });
    }
  }, [user]);

  const onHandleSave = (onValidForm: onSettingsForm) => {
    if (loading) return;
    mutation(onValidForm);
  };
  const onBadgePrevieW = () => {
    setUrlState({ ...urlState, badgeUrl: `${watch("badge")}` });
  };

  const onBannerPrevieW = () => {
    setUrlState({ ...urlState, bannerUrl: `${watch("banner")}` });
  };

  const onIntroPrevieW = () => {
    setUrlState({ ...urlState, introText: `${watch("intro")}` });
  };

  return (
    <Layout title="설정" canGoBack hasSideBar>
      <Head>
        <title>설정 / 가벼운 트위터</title>
      </Head>
      <div className="px-5 flex flex-col">
        <span className="font-bold text-xl">계정</span>
        <form
          onSubmit={handleSubmit(onHandleSave)}
          className="flex flex-col w-full max-w-2xl py-5 pb-5"
        >
          <span className="font-bold text-sm">프로필 이미지</span>
          <div className="flex justify-center">
            <img
              className="mb-5 drop-shadow-2xl w-28 aspect-square rounded-full border-4 object-cover object-center  border-white bg-gray-300"
              src={urlState.badgeUrl}
              alt=""
            />
          </div>
          <div className="flex">
            <input
              {...register("badge", {
                required: "프로필 이미지 주소를 입력해 주세요.",
                validate: {
                  onlyNaver: (value) =>
                    value.includes("pstatic.net") ||
                    "! 네이버 검색 이미지만 가능해요.",
                },
              })}
              className="w-full text-sm bg-gray-200 rounded-l-lg p-2 focus:bg-white"
              defaultValue={user?.badge}
              type="text"
            />
            <button
              onClick={onBadgePrevieW}
              type="button"
              className="w-40 font-semibold text-white text-sm bg-black hover:opacity-70 rounded-r-lg"
            >
              미리보기
            </button>
          </div>
          <span className="text-xs text-red-500 pt-1">
            {errors?.badge?.message}
          </span>
          <span className="font-bold text-sm pt-5 pb-1">배너 이미지</span>
          <img
            className={
              "mb-5 shadow-xl h-40 w-full bg-cover rounded-xl  object-cover bg-gray-300"
            }
            src={urlState.bannerUrl}
          />
          <div className="flex">
            <input
              {...register("banner", {
                required: "배너 이미지 주소를 입력해 주세요.",
                validate: {
                  onlyNaver: (value) =>
                    value.includes("pstatic.net") ||
                    "! 네이버 검색 이미지만 가능해요.",
                },
              })}
              className="w-full text-sm bg-gray-200 rounded-l-lg p-2 focus:bg-white"
              defaultValue={user?.banner}
              type="text"
            />
            <button
              onClick={onBannerPrevieW}
              type="button"
              className="w-40 font-semibold text-white text-sm bg-black hover:opacity-70 rounded-r-lg"
            >
              미리보기
            </button>
          </div>
          <span className="text-xs text-red-500 pt-1">
            {errors?.banner?.message}
          </span>
          <span className="font-bold text-sm pt-5 pb-1">소개글</span>
          <div className="h-24 p-1 border-y-[1px] border-gray-300 rounded-lg">
            <span>{urlState?.introText}</span>
          </div>
          <textarea
            {...register("intro", {
              required: "소개글을 입력해 주세요.",
              maxLength: { message: "글자수는 140자로 제한됩니다", value: 140 },
            })}
            defaultValue={user?.intro}
            className={cls(
              "w-full h-24 p-2 border-2 border-white rounded-md bg-gray-200 focus:bg-white",
              watch("intro")?.length > 140
                ? " focus:outline-red-500  border-red-500"
                : ""
            )}
          ></textarea>
          <div className="mb-2 flex justify-end">
            <span
              className={cls(
                "pr-1",
                watch("intro")?.length > 140 ? "text-red-500" : ""
              )}
            >
              {watch("intro")?.length}
            </span>
            <span className="font-sm text-sm">/140</span>
          </div>
          <div className="flex justify-end pb-5">
            <button
              onClick={onIntroPrevieW}
              type="button"
              className="w-28 p-2 font-semibold text-white text-sm bg-black rounded-lg hover:opacity-70"
            >
              미리보기
            </button>
          </div>
          <Button type="submit" text={loading ? "저장중..." : "저장"}></Button>
        </form>
      </div>
    </Layout>
  );
}
