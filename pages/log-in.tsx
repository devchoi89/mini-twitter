import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import Input from "../components/input";
import useMutation from "../lib/useMutation";
import Image from "next/image";
import feather from "../public/images/feather.jpg";
interface LoginForm {
  email: string;
  erorr?: string;
}

export default function LogIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });
  const [mutation, { data, loading }] = useMutation("/api/login");
  const onValid = (validForm: LoginForm) => {
    if (loading) return;
    mutation(validForm);
  };

  useEffect(() => {
    if (data?.ok) {
      router.push("/");
    }
  }, [data, router]);

  return (
    <div className="bg-transparent h-screen w-screen flex justify-center items-center  bg-gradient-to-b from-indigo-200 to-pink-200">
      <Head>
        <title>로그인 / 가벼운 트위터</title>
      </Head>
      <div className="bg-white rounded-lg shadow-2xl flex flex-col justify-center items-center w-full max-w-2xl mx-auto pt-20 pb-40 ">
        <div className="w-2/3 flex flex-col justify-center items-center">
          <Image
            className="rounded-full"
            src={feather}
            width="100"
            height="100"
            alt=""
          />
          <h1 className="text-center text-4xl font-bold mt-5">가벼운 트위터</h1>
          <h2 className="text-sm pt-3">쉽다. 단순하다.</h2>
          <form
            className="flex flex-col w-full my-20"
            onSubmit={handleSubmit(onValid)}
          >
            <Input
              type="text"
              kind="text"
              label="이메일"
              register={register("email", {
                required: "!이메일을 입력해주세요",
                validate: {
                  notEmail: (value) =>
                    value.includes("@") || "!이메일을 입력해주세요",
                },
              })}
            ></Input>
            <span className="text-xs text-red-500">
              {errors.email?.message}
            </span>
            <span className="text-xs text-red-500">
              {data?.ok === false
                ? "!가입된 이메일이 아닙니다. 입력하신 내용을 다시 확인해주세요"
                : null}
            </span>
            <div className="mt-5">
              <Button text={loading ? "로그인 중입니다..." : "로그인"}></Button>
            </div>
          </form>

          <div className="border-t-[1px] w-full flex justify-center">
            <div className="relative -top-3 bg-white px-3">
              <span>계정이 없으신가요?</span>
              <Link href="/create-account">
                <span className="text-pink-400 cursor-pointer font-semibold">
                  &nbsp;가입하기
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
