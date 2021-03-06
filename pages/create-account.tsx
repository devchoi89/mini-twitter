import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import Input from "../components/input";
import useMutation from "../lib/useMutation";

interface SignUpForm {
  name: string;
  userId: string;
  email: string;
  error?: string;
}

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    mode: "onChange",
  });
  const [mutation, { loading, data, error }] = useMutation("api/create");
  const onValid = (validForm: SignUpForm) => {
    if (loading) return;
    mutation(validForm);
  };
  useEffect(() => {
    if (data?.ok) {
      window.alert("가입 성공!");
      router.push("/log-in");
    }
  }, [data, router]);

  return (
    <div className=" h-screen w-screen flex justify-center items-center  bg-gradient-to-b from-indigo-200 to-pink-200">
      <Head>
        <title>가입하기 / 가벼운 트위터</title>
      </Head>
      <div className=" bg-white rounded-2xl shadow-2xl flex flex-col justify-center items-center w-full max-w-2xl mx-auto py-40 ">
        <div className="w-2/3 flex flex-col justify-center items-center">
          <h1 className="text-center text-4xl font-bold mb-10">
            지금 바로 가입하세요
          </h1>
          <form
            className="w-full flex flex-col my-10"
            onSubmit={handleSubmit(onValid)}
          >
            <div className="flex flex-col space-y-2">
              <Input
                type="text"
                kind="text"
                label="이름"
                register={register("name", {
                  required: "! 이름을 입력해 주세요",
                  validate: {
                    notEmail: (value) =>
                      !(value.search(/^\s/) > -1 || value.search(/\s$/) > -1) ||
                      "! 이름의 시작과 끝에는 공백이 없어야 합니다",
                  },
                })}
              ></Input>
              <span className="text-xs text-red-500">
                {errors.name?.message}
              </span>
              <Input
                type="text"
                kind="text"
                label="아이디"
                register={register("userId", {
                  required: "! 아이디를 입력해 주세요",
                  validate: {
                    onlyNumAndEng: (value) =>
                      value.search(/[\W]/g) === -1 ||
                      "! 영문자 또는 숫자만 입력해주세요",
                    noUpperCase: (value) =>
                      value.search(/[A-Z]/g) === -1 ||
                      "! 소문자만 입력해주세요",
                  },
                })}
              ></Input>
              <div>
                {error ? (
                  <span className="text-xs text-red-500">
                    ! 중복된 아이디입니다
                  </span>
                ) : null}
                <span className="text-xs text-red-500">
                  {errors.userId?.message}
                </span>
              </div>
              <Input
                type="text"
                kind="text"
                label="이메일"
                register={register("email", {
                  required: "! 이메일을 입력해주세요",
                  validate: {
                    notEmail: (value) =>
                      value.search(/^\S+@\S+$/) > -1 ||
                      "! 이메일을 입력해주세요",
                  },
                })}
              ></Input>
              <span className="text-xs text-red-500">
                {errors.email?.message}
              </span>
            </div>

            <div className="mt-5">
              <Button text={loading ? "로딩중..." : "가입하기"}></Button>
            </div>
          </form>
          <div className="border-t-[1px] mt-10 flex justify-center">
            <div className="relative -top-3 bg-white px-3">
              <span>이미 계정이 있으신가요?</span>
              <Link href="/log-in">
                <span className="text-pink-400 cursor-pointer font-semibold">
                  &nbsp;로그인
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
