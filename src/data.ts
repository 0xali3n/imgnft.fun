export interface NFT {
  id: string;
  name: string;
  image: string;
  price: number;
  creator: string;
  description: string;
  category: string;
}

export const categories = [
  "All",
  "Art",
  "Collectibles",
  "Photography",
  "Virtual Worlds",
  "Sports",
];

export const nftData: NFT[] = [
  {
    id: "1",
    name: "Cosmic Sui Dream #1",
    image: "https://picsum.photos/800/800?random=1",
    price: 2.5,
    creator: "0x89...3a4b",
    description: "A mesmerizing digital artwork exploring the cosmos of Sui",
    category: "Art",
  },
  {
    id: "2",
    name: "Digital Genesis",
    image: "https://picsum.photos/800/800?random=2",
    price: 1.8,
    creator: "0x34...9c2d",
    description: "The beginning of digital art revolution on Sui",
    category: "Art",
  },
  {
    id: "3",
    name: "Sui Sports Moment",
    image: "https://picsum.photos/800/800?random=3",
    price: 3.2,
    creator: "0x56...7e8f",
    description: "Iconic sports moment preserved as NFT",
    category: "Sports",
  },
  {
    id: "4",
    name: "Virtual Paradise",
    image: "https://picsum.photos/800/800?random=4",
    price: 4.5,
    creator: "0x12...9d0e",
    description: "Explore this beautiful virtual world",
    category: "Virtual Worlds",
  },
];
