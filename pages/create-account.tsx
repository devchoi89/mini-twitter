import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import Input from "../components/input";

interface SignUpForm {
  name: string;
  userId: string;
  email: string;
  erorr?: string;
}

export default function SignUp() {
  const router = useRouter();
  const [result, setResult] = useState(false);
  const { register, handleSubmit } = useForm<SignUpForm>({ mode: "onChange" });
  const onValid = (validForm: SignUpForm) => {
    fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validForm),
    })
      .then((response) => response.json())
      .then((data) => setResult(data?.ok));
  };

  useEffect(() => {
    if (result) {
      alert("가입 성공!");
      router.push("/log-in");
    }
  }, [result, router]);

  return (
    <div className="bg-transparent h-screen w-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-2xl flex flex-col justify-center w-full max-w-2xl mx-auto px-28 py-40 ">
        <h1 className="text-center text-4xl font-bold mb-10">
          지금 바로 가입하세요
        </h1>
        <form className="flex flex-col my-10" onSubmit={handleSubmit(onValid)}>
          <div className="flex flex-col space-y-2">
            <Input
              type="text"
              kind="text"
              placeholder="이름"
              register={register("name")}
              required
            ></Input>
            <Input
              type="text"
              kind="text"
              placeholder="아이디"
              register={register("userId")}
              required
            ></Input>
            <Input
              type="email"
              kind="text"
              placeholder="이메일"
              register={register("email")}
              required
            ></Input>
          </div>
          <div className="mt-5">
            <Button text="가입하기"></Button>
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
  );
}
