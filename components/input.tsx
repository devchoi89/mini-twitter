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
          className="transition-all ease-in-out bg-gray-100 focus:bg-white w-full p-2 rounded-md border-2 border-gray-200"
        />
      ) : null}
    </div>
  );
}
