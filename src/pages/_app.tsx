import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./layout";
import Head from "next/head";
import { trpc } from "../utils/trpc";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Project Stage</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default trpc.withTRPC(App);