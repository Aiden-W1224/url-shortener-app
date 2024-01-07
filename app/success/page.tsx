import React from "react";

type SuccessPageProps = {
  searchParams: {
    code: string;
  };
};

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const { code } = searchParams;
  console.log(code);

  return (
    <>
        <h1 className="text-2xl text-slate-700 my-4 text-center">
        Here is your shortened Url:
        </h1>
        <p>{`${process.env.NEXTPUBLIC_URL}/api/${code}`}</p>
      
    </>
  );
}