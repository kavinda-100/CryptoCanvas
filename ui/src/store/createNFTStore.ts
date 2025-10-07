import { create } from "zustand";

type CreateNFTStoreDetails = {
  NFTId: number;
  name: string;
  description: string;
  image: string;
  fallbackImage: string;
  attributes: { trait_type: string; value: string }[];
  external_link: string;

  setNFTId: (id: number) => void;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setImage: (image: string) => void;
  setFallbackImage: (image: string) => void;
  setAttributes: (attributes: { trait_type: string; value: string }[]) => void;
  setExternalLink: (link: string) => void;
};

export const useCreateNFTStoreDetails = create<CreateNFTStoreDetails>(
  (set) => ({
    NFTId: 0,
    name: "",
    description: "",
    image: "",
    fallbackImage: "",
    attributes: [] as { trait_type: string; value: string }[],
    external_link: "",

    setNFTId: (id: number) => set({ NFTId: id }),
    setName: (name: string) => set({ name }),
    setDescription: (description: string) => set({ description }),
    setImage: (image: string) => set({ image }),
    setFallbackImage: (image: string) => set({ fallbackImage: image }),
    setAttributes: (attributes: { trait_type: string; value: string }[]) =>
      set({ attributes }),
    setExternalLink: (link: string) => set({ external_link: link }),
  }),
);
