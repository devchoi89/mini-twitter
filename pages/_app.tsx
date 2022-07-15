import { SWRConfig } from "swr";
import "../global.css";

export default function App({ Component, pageProps }: any) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <Component {...pageProps} />
      <style jsx global>
        {`
          body {
            background-image: linear-gradient(
              rgba(255, 255, 255, 0.3),
              rgba(255, 255, 255, 0.3)
            );

            background-attachment: fixed;
            background-size: 30%;
            background-repeat: repeat-x;
            background-position: left;
          }
        `}
      </style>
    </SWRConfig>
  );
}
