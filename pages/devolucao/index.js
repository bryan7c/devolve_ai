import { useState } from "react";
import Head from "next/head";
import { InternalLayout } from "@/src/layout/internalLayout";
import { useRouter } from "next/router";
import { createReturnedItem } from "@/src/services/ReturnedService";
import "dayjs/locale/pt-br";
import dynamic from "next/dynamic";
import ReturnedPage from "./returnedPage";

const Map = dynamic(() => import("@/src/components/Map/index"), { ssr: false });

export function getServerSideProps() {
  const googleKey = process.env.GOOGLE_MAP_KEY;
  return {
    props: {
      googleKey,
    },
  };
}

const libraries = ["places"];
function CreateReturnedPage({ googleKey }) {
  const router = useRouter();

  function handleSave(returnedItem) {
    console.log(returnedItem);
    createReturnedItem(returnedItem).then(() => {
      router.push("/");
    });
  }

  return (
    <>
      <Head>
        <title>Criando uma nova devolução</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ReturnedPage onSave={handleSave} googleKey={googleKey}></ReturnedPage>
    </>
  );
}
CreateReturnedPage.PageLayout = InternalLayout;

export default CreateReturnedPage;
