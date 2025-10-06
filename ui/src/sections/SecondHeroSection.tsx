import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AtomIcon } from "lucide-react";
import DotLine from "@/components/DotLine";

const SecondHeroSection = () => {
  return (
    <div
      className={
        "container mx-auto grid h-screen grid-cols-3 gap-5 bg-[#1C1C1E]"
      }
    >
      {/* section one */}
      <div
        className={
          "col-span-3 flex h-full w-full flex-col gap-10 px-2 py-5 lg:col-span-2 lg:px-5 lg:py-5"
        }
      >
        <DotLine length={20} />
        <h1 className={"text-4xl font-extrabold text-pretty lg:text-[80px]"}>
          Game Changers for Online Investment Strategy Of NFTs
        </h1>

        <p
          className={
            "text-muted-foreground text-base font-medium text-pretty lg:mb-3"
          }
        >
          Join our community of passionate NFT enthusiasts and discover the
          limitless possibilities of digital ownership. Whether you&#39;re an
          artist looking to showcase your work or a collector seeking rare
          treasures, our platform provides the tools and resources you need to
          thrive in the NFT space. Experience seamless transactions, robust
          security, and a vibrant marketplace that connects you with like-minded
          individuals. Don&#39;t miss out on the opportunity to be part of this
          exciting revolution. Sign up now and unlock a world of creativity and
          investment potential!
        </p>
        <Button variant={"default"} asChild className={"w-1/2 lg:w-1/3"}>
          <Link href={"/browse"} className={"flex items-center gap-3"}>
            <AtomIcon className={"size-5"} />
            Explore NFTs
          </Link>
        </Button>
      </div>

      {/* section two */}
      <div
        className={
          "col-span-3 gap-4 bg-green-400 px-2 lg:col-span-1 lg:ml-5 lg:px-0"
        }
      >
        <Image
          src={"/hero-two.png"}
          alt={"NFT Image two"}
          width={800}
          height={800}
          className={"rounded-lg object-cover lg:h-full lg:w-full"}
        />
      </div>
    </div>
  );
};
export default SecondHeroSection;
