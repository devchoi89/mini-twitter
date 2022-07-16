import Head from "next/head";
import { useEffect, useState } from "react";
import Button from "../../components/button";
import Layout from "../../components/layout";
import useUser from "../../lib/useUser";

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
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setUrlState({
        bannerUrl: user?.banner,
        badgeUrl: user?.badge,
        introText: user?.intro,
      });
    }
  }, [user]);
  return (
    <Layout title="설정" canGoBack hasSideBar>
      <Head>
        <title>설정</title>
      </Head>
      <div className=" ">
        <form className="flex flex-col w-full items-center max-w-2xl pb-5 px-5">
          <img
            className="mb-5 drop-shadow-2xl w-28 aspect-square rounded-full border-4 object-cover object-center  border-white bg-gray-300"
            src={urlState.badgeUrl}
          />

          <input type="text" />
          <Button text="사진 주소 변경"></Button>
        </form>
        <form className="flex flex-col w-full items-center max-w-2xl pb-5 px-5">
          <img
            className={
              "mb-5 mt-10 drop-shadow-2xl h-40 w-96 bg-cover rounded-xl  object-cover bg-gray-300"
            }
            src={urlState.bannerUrl}
          />
          <input type="text" />
          <Button text="배너 주소 변경"></Button>
        </form>
        <form className="flex flex-col w-full items-center max-w-2xl pb-5 px-5">
          {urlState.introText}
          <input type="text" />
          <Button text="소개문구 변경"></Button>
        </form>
      </div>
    </Layout>
  );
}
