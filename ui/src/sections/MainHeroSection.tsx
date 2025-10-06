import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SparklesText } from "@/components/SparklesText";

const MainHeroSection = () => {
  return (
    <div
      className={"container mx-auto grid h-screen grid-cols-3 gap-5 bg-black"}
    >
      {/* section one */}
      <div
        className={"col-span-3 flex flex-col gap-4 px-2 lg:col-span-1 lg:px-0"}
      >
        <Image
          src={"/hero-one.png"}
          alt={"NFT Image"}
          width={400}
          height={400}
        />
        <p className={"text-base font-bold text-pretty lg:mb-3"}>
          Welcome to the future of digital ownership! Our NFT marketplace is the
          ultimate destination for creators, collectors, and investors.
        </p>
        <Button variant={"default"} asChild>
          <Link href={"/browse"}>Buy Now</Link>
        </Button>
      </div>

      {/* section two */}
      <div
        className={
          "col-span-3 flex h-full w-full flex-col items-center justify-center px-2 lg:col-span-2 lg:ml-5 lg:px-0"
        }
      >
        <h1
          className={
            "flex flex-col gap-5 text-7xl font-extrabold text-pretty lg:text-9xl"
          }
        >
          <div className={"h-2 w-full bg-white"} />
          Start Making Money With{" "}
          <SparklesText
            text={"NFTs"}
            textClassName={"text-7xl font-extrabold lg:text-9xl"}
          />
          <div className={"h-2 w-full bg-white"} />
        </h1>
      </div>
    </div>
  );
};
export default MainHeroSection;
