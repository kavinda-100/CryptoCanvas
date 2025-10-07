"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CreateNFT } from "./_steps/CreateNFT";
import { ApproveNFT } from "./_steps/ApproveNFT";
import { ListNFTs } from "./_steps/ListNFTs";

const CreateNFTPage = () => {
  const [steps, setSteps] = React.useState<1 | 2 | 3>(1);
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      <div className="flex w-full max-w-2xl flex-col gap-6">
        <div>Steps {steps} / 3</div>
        {/* step 1 */}
        {steps === 1 && <CreateNFT />}
        {/* step 2 */}
        {steps === 2 && <ApproveNFT />}
        {/* step 3 */}
        {steps === 3 && <ListNFTs />}

        {/* step inc/dec */}
        <div className="mt-4 flex w-full justify-between">
          {steps > 1 && (
            <Button
              onClick={() =>
                setSteps((prev) =>
                  prev > 1 ? ((prev - 1) as 1 | 2 | 3) : prev,
                )
              }
              disabled={steps === 1}
            >
              Previous
            </Button>
          )}
          {steps < 3 && (
            <Button
              onClick={() =>
                setSteps((prev) =>
                  prev < 3 ? ((prev + 1) as 1 | 2 | 3) : prev,
                )
              }
              disabled={steps === 3}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CreateNFTPage;
