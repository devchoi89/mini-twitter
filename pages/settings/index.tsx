import Head from "next/head";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import Layout from "../../components/layout";
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
  const { register, watch, handleSubmit } = useForm<onSettingsForm>({
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      setUrlState({
        bannerUrl: user?.banner,
        badgeUrl: user?.badge,
        introText: user?.intro,
      });
    }
  }, [user]);

  const onHandleSave = async (onValidForm: onSettingsForm) => {
    console.log(onValidForm);
  };
  const onBadgePrevieW = () => {
    setUrlState({ ...urlState, badgeUrl: watch("badge") });
    console.log(urlState.badgeUrl);
  };

  const onBannerPrevieW = () => {
    setUrlState({ ...urlState, bannerUrl: watch("banner") });
    console.log(urlState.badgeUrl);
    console.log(watch("banner"));
  };

  const onIntroPrevieW = () => {
    setUrlState({ ...urlState, introText: watch("intro") });
    console.log(urlState.badgeUrl);
    console.log(watch("intro"));
  };

  return (
    <Layout title="설정" canGoBack hasSideBar>
      <Head>
        <title>설정</title>
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
              })}
              className="w-full text-sm bg-gray-200 rounded-l-lg p-2 focus:bg-white"
              defaultValue={user?.badge}
              type="text"
            />
            <button
              onClick={onBadgePrevieW}
              type="button"
              className="w-40 font-semibold text-white text-sm bg-black rounded-r-lg"
            >
              미리보기
            </button>
          </div>
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
              })}
              className="w-full text-sm bg-gray-200 rounded-l-lg p-2 focus:bg-white"
              defaultValue={user?.banner}
              type="text"
            />
            <button
              onClick={onBannerPrevieW}
              type="button"
              className="w-40 font-semibold text-white text-sm bg-black rounded-r-lg"
            >
              미리보기
            </button>
          </div>
          <span className="font-bold text-sm pt-5 pb-1">소개글</span>
          <div className="h-24 p-1 border-y-[1px] border-gray-300 rounded-lg">
            <span className="text-sm">{urlState?.introText}</span>
          </div>
          <textarea
            {...register("intro", {
              required: "소개글을 입력해 주세요.",
              maxLength: { message: "글자수는 140자로 제한됩니다", value: 140 },
            })}
            defaultValue={user?.intro}
            className={cls(
              "w-full h-24 p-2 text-sm border-2 border-white rounded-md bg-gray-200 focus:bg-white",
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
              className="w-28 p-2 font-semibold text-white text-sm bg-black rounded-lg"
            >
              미리보기
            </button>
          </div>
          <Button type="submit" text="저장"></Button>
        </form>
      </div>
    </Layout>
  );
}