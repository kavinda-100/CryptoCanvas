"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CreateNFT } from "./_steps/CreateNFT";
import { ApproveNFT } from "./_steps/ApproveNFT";
import { ListNFTs } from "./_steps/ListNFTs";
import { CheckCircle, Upload, Shield, Store } from "lucide-react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const CreateNFTPage = () => {
  const account = useAccount();
  const router = useRouter();
  const [steps, setSteps] = React.useState<1 | 2 | 3>(1);

  // Redirect to home if not connected
  React.useEffect(() => {
    if (!account.isConnected) {
      router.push("/");
    }
  }, [account, router]);

  // Step data for rendering

  const stepData = [
    {
      number: 1,
      title: "Create NFT",
      description: "Upload artwork & metadata",
      icon: Upload,
    },
    {
      number: 2,
      title: "Approve NFT",
      description: "Grant marketplace permission",
      icon: Shield,
    },
    {
      number: 3,
      title: "List NFT",
      description: "Set price & list for sale",
      icon: Store,
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 py-8">
        {/* Enhanced Steps Indicator */}
        <div className="w-full">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              Create Your NFT
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Follow these steps to mint and list your digital artwork
            </p>
          </div>

          {/* Step Progress Bar */}
          <div className="relative mb-8">
            <div className="flex items-center justify-between">
              {stepData.map((step, index) => {
                const isActive = steps === step.number;
                const isCompleted = steps > step.number;
                const IconComponent = step.icon;

                return (
                  <div
                    key={step.number}
                    className="relative flex flex-col items-center"
                  >
                    {/* Step Circle */}
                    <div
                      className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 transition-all duration-300 ${
                        isCompleted
                          ? "border-green-500 bg-green-500 text-white"
                          : isActive
                            ? "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                            : "border-gray-300 bg-white text-gray-400 dark:border-gray-600 dark:bg-gray-700"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-8 w-8" />
                      ) : (
                        <IconComponent className="h-8 w-8" />
                      )}
                    </div>

                    {/* Step Info */}
                    <div className="mt-4 text-center">
                      <div
                        className={`text-sm font-semibold ${
                          isActive
                            ? "text-emerald-600 dark:text-emerald-400"
                            : isCompleted
                              ? "text-green-600 dark:text-green-400"
                              : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {step.description}
                      </div>
                    </div>

                    {/* Connection Line */}
                    {index < stepData.length - 1 && (
                      <div
                        className={`absolute top-8 left-16 -z-10 h-1 w-full transition-all duration-300 ${
                          steps > step.number
                            ? "bg-green-500"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                        style={{ width: "calc(100vw / 3 - 4rem)" }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Step Badge */}
          <div className="mb-6 flex justify-center">
            <div className="rounded-full border border-emerald-200 bg-emerald-50 px-6 py-2 shadow-md dark:border-emerald-700 dark:bg-emerald-900/30">
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Step {steps} of 3
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            {/* step 1 */}
            {steps === 1 && <CreateNFT setSteps={setSteps} />}
            {/* step 2 */}
            {steps === 2 && <ApproveNFT setSteps={setSteps} />}
            {/* step 3 */}
            {steps === 3 && <ListNFTs />}
          </div>
        </div>

        {/* Enhanced Navigation Buttons */}
        <div className="flex justify-center">
          <div className="flex gap-4 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-lg dark:border-emerald-700 dark:bg-emerald-900/20">
            {steps > 1 && (
              <Button
                variant="outline"
                onClick={() =>
                  setSteps((prev) =>
                    prev > 1 ? ((prev - 1) as 1 | 2 | 3) : prev,
                  )
                }
                disabled={steps === 1}
                className="min-w-[120px] border-emerald-300 text-emerald-700 transition-all duration-200 hover:scale-105 hover:bg-emerald-100 dark:border-emerald-600 dark:text-emerald-300 dark:hover:bg-emerald-800"
              >
                ← Previous
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
                className="min-w-[120px] bg-emerald-600 text-white transition-all duration-200 hover:scale-105 hover:bg-emerald-700"
              >
                Next →
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateNFTPage;
