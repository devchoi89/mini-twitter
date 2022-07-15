import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  type: string;
  kind?: "text";
  register: UseFormRegisterReturn;
  label?: string;
}

export default function Input({
  type,
  kind = "text",
  register,
  label,
}: InputProps) {
  return (
    <div>
      {kind === "text" ? (
        <div className="relative">
          <input
            id="floating_filled"
            {...register}
            type={type}
            placeholder=" "
            className="appearance-none block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 border-2 border-gray-200 dark:text-white focus:outline-none focus:ring-0 focus:border-pink-300 peer"
          />
          <label
            htmlFor="floating_filled"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-pink-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            {label}
          </label>
        </div>
      ) : null}
    </div>
  );
}
