import Head from "next/head";
import { useEffect, useState } from "react";
import Button from "../../components/button";
import Layout from "../../components/layout";
import useUser from "../../lib/useUser";
import { cls } from "../../lib/utils";

interface ProfileState {
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
  const { user } = useUser();
  const [state, setState] = useState<ProfileState>({
    banner: "#",
    badge: "#",
    intro: " ",
  });
  const [urlState, setUrlState] = useState<UrlState>({
    bannerUrl: " ",
    badgeUrl: " ",
    introText: " ",
  });
  useEffect(() => {
    if (user?.banner && user?.badge && user?.intro) {
      setState({
        banner: "bg-[url(" + user?.banner + ")]",
        badge: "bg-[url(" + user?.badge + ")]",
        intro: user?.intro,
      });
      setUrlState({
        bannerUrl: user?.banner,
        badgeUrl: user?.badge,
        introText: user?.intro,
      });
      console.log(state);
    }
  }, [user]);
  console.log(user);

  return (
    <Layout title="설정" canGoBack hasSideBar>
      <Head>
        <title>설정</title>
      </Head>
      <div className=" ">
        <form className="flex flex-col w-full items-center max-w-2xl pb-5 px-5">
          <div
            className={cls(
              "mb-5 shadow-2xl w-28 aspect-square rounded-full border-4 bg-cover bg-center  border-white bg-gray-300 ",
              state.badge
            )}
          />
          <input type="text" defaultValue={urlState.badgeUrl} />
          <Button text="사진 주소 변경"></Button>
        </form>
        <form className="flex flex-col w-full items-center max-w-2xl pb-5 px-5">
          <div
            className={cls(
              "mb-5 mt-10 drop-shadow-2xl h-40 w-full bg-cover rounded-xl  bg-center flex justify-end items-start  bg-gray-300 ",
              state.banner
            )}
          />
          <input type="text" defaultValue={urlState.bannerUrl} />
          <Button text="배너 주소 변경"></Button>
        </form>
        <form className="flex flex-col w-full items-center max-w-2xl pb-5 px-5">
          <input type="text" defaultValue={urlState.introText} />
          <Button text="소개문구 변경"></Button>
        </form>
      </div>
    </Layout>
  );
}
