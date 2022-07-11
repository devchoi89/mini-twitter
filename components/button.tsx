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
        "w-full text-white font-bold bg-pink-200 bg-opacity-100 p-2 rounded-md"
      )}
    >
      {text}
    </button>
  );
}
