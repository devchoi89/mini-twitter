import { cls } from "../lib/utils";

interface ButtonProps {
  text: string;
  [key: string]: any;
}

export default function Button({ text, ...rest }: ButtonProps) {
  return (
    <button
      type="submit"
      {...rest}
      className={cls(
        "transition-all ease-in-out duration-500 w-full cursor-pointer text-white font-bold bg-gray-800 hover:opacity-80 p-2 rounded-md"
      )}
    >
      {text}
    </button>
  );
}
