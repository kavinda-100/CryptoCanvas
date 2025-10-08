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
