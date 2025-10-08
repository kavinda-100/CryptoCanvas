"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useAccount } from "wagmi";

const MyArtPage = () => {
  const account = useAccount();
  const router = useRouter();

  // Redirect to home if not connected
  React.useEffect(() => {
    if (
      (!account.isConnected && account.status !== "connecting") ||
      account.isReconnecting
    ) {
      router.push("/");
    }
  }, [account, router]);

  return <div>MyArtPage</div>;
};

export default MyArtPage;
