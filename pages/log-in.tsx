import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import Button from "../components/button";
import Input from "../components/input";
interface LoginForm {
  email: string;
  erorr?: string;
}

export default function LogIn() {
  const { data } = useSWR("/api/profile");
  const router = useRouter();
  const [result, setResult] = useState(Object);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });
  const onValid = (validForm: LoginForm) => {
    fetch("/api/login", {
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
    if (data?.ok | result?.ok) {
      router.push("/");
    }
  }, [data, result, router]);

  return (
    <div className="flex flex-col max-w-lg mx-auto py-10">
      <h1 className="text-center text-2xl font-bold">미니 트위터</h1>
      <form className="flex flex-col mt-10" onSubmit={handleSubmit(onValid)}>
        <Input
          type="email"
          kind="text"
          required
          placeholder="이메일"
          register={register("email", { required: "이메일을 입력해주세요." })}
        ></Input>
        <div className="mt-5">
          <Button text="로그인"></Button>
        </div>
      </form>
    </div>
  );
}
