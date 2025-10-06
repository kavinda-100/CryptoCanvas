import React from "react";
import Image from "next/image";

const BannerSection = () => {
  return (
    <div className={"container mx-auto my-10"}>
      <div
        className={
          "flex w-full items-center gap-10 rounded-r-full bg-green-400 p-5"
        }
      >
        <div className={"flex w-1/2 flex-col gap-4"}>
          <h1
            className={
              "text-4xl font-extrabold text-pretty text-black lg:text-6xl"
            }
          >
            Take Your NFT Collection to the Next Level
          </h1>

          <p
            className={
              "text-base font-medium text-pretty text-gray-600 lg:mb-3"
            }
          >
            Join our community of creators and collectors to explore the future
            of digital ownership.
            <br />
            Discover, buy, and sell unique NFTs with ease.
          </p>

          <div
            className={
              "w-fit cursor-pointer rounded-lg border border-gray-700 px-6 py-3"
            }
          >
            <span className={"font-medium text-black"}>Join Now</span>
          </div>
        </div>

        <Image
          src={"/banner.png"}
          alt={"banner-image"}
          width={400}
          height={400}
          className={"-scale-x-100 transform"}
        />
      </div>
    </div>
  );
};
export default BannerSection;
