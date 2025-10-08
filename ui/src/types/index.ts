/**
 * Typescript types for the ListingWithTokenURI struct in the Solidity contract.
 * 
 * @example
 * ```solidity
 * // ListingWithTokenURI struct in Solidity
 * struct ListingWithTokenURI {
        uint256 listingId;
        address seller;
        address buyer;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool active;
        uint256 listedAt;
        string tokenURI;
    }
    ```
 */
export type ListingWithTokenURIType = {
  listingId: bigint;
  seller: `0x${string}`;
  buyer: `0x${string}`;
  nftContract: `0x${string}`;
  tokenId: bigint;
  price: bigint;
  active: boolean;
  listedAt: bigint;
  tokenURI: string;
};

/**
 * Typescript type for the NFT metadata.
 * @example
 * ```json
 * {
      "name": "My NFT",
      "description": "This is my first NFT",
      "image": "https://ipfs.io/ipfs/<CID>",
      "fallbackImage": "https://yourgateway.mypinata.cloud/ipfs/<CID>",
      "attributes": [
        {
          "trait_type": "Background",
          "value": "Blue"
        },
        {
          "trait_type": "Eyes",
          "value": "Green"
        }
      ],
      "external_link": "https://cryptocanvas.com/nft/1"
    }
    ```
 */
export type NFTMetadataType = {
  name: string;
  description: string;
  image: string;
  fallbackImage: string;
  attributes: { trait_type: string; value: string }[];
  external_link: string | undefined;
};
