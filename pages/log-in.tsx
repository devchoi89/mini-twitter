import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import Input from "../components/input";
interface LoginForm {
  email: string;
  erorr?: string;
}

export default function LogIn() {
  const router = useRouter();
  const [result, setResult] = useState(Object);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });
  const onValid = async (validForm: LoginForm) => {
    await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validForm),
    })
      .then((response) => response.json())
      .then((data) => setResult(data));
  };

  useEffect(() => {
    if (result?.ok) {
      router.push("/");
    }
  }, [result, router]);

  return (
    <div className="bg-transparent h-screen w-screen flex justify-center items-center  bg-gradient-to-b from-indigo-200 to-pink-200">
      <div className="bg-white rounded-lg shadow-2xl flex flex-col justify-center w-full max-w-2xl mx-auto px-28 py-40 ">
        <h1 className="text-center text-5xl font-bold">미니 트위터</h1>
        <form className="flex flex-col my-20" onSubmit={handleSubmit(onValid)}>
          <Input
            type="text"
            kind="text"
            label="이메일"
            register={register("email", {
              required: "이메일을 입력해주세요.",
              validate: {
                notEmail: (value) =>
                  value.includes("@") || "이메일을 입력해주세요.",
              },
            })}
          ></Input>
          <span className="text-xs text-red-500">{errors.email?.message}</span>
          <span className="text-xs text-red-500">
            {result?.ok === false
              ? "가입된 이메일이 아닙니다. 입력하신 내용을 다시 확인해주세요."
              : null}
          </span>
          <div className="mt-5">
            <Button text="로그인"></Button>
          </div>
        </form>

        <div className="border-t-[1px] flex justify-center">
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
  );
}
