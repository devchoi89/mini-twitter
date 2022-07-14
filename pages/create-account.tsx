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
    <div className="flex flex-col max-w-2xl mx-auto py-10">
      <h1 className="text-center text-2xl font-bold mb-10">계정 만들기</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onValid)}>
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
    </div>
  );
}
