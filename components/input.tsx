import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  type: string;
  kind?: "text";
  required: boolean;
  register: UseFormRegisterReturn;
  placeholder?: string;
}

export default function Input({
  type,
  kind = "text",
  required,
  register,
  placeholder,
}: InputProps) {
  return (
    <div>
      {kind === "text" ? (
        <input
          {...register}
          type={type}
          placeholder={placeholder}
          required={required}
          className="transition-all duration-500 outline-none  focus:border-red-300 bg-gray-100 focus:bg-white w-full focus:p-3 p-3 rounded-lg border-2 border-gray-100"
        />
      ) : null}
    </div>
  );
}
