if (!import.meta.env.VITE_SUI_NETWORK) {
  console.error("Missing VITE_SUI_NETWORK in environment variables");
}
if (!import.meta.env.VITE_ADMIN_ADDRESS) {
  console.error("Missing VITE_ADMIN_ADDRESS in environment variables");
}
if (!import.meta.env.VITE_ADMIN_SECRET_KEY) {
  console.error("Missing VITE_ADMIN_SECRET_KEY in environment variables");
}

export const SUI_NETWORK = import.meta.env.VITE_SUI_NETWORK!;
export const ADMIN_ADDRESS = import.meta.env.VITE_ADMIN_ADDRESS!;
export const ADMIN_SECRET_KEY = import.meta.env.VITE_ADMIN_SECRET_KEY!;

// console.log everything in the process.env object
const keys = Object.keys(import.meta.env);
console.log("env contains ADMIN_ADDRESS:", keys.includes("ADMIN_ADDRESS"));
console.log("env contains ADMIN_SECRET_KEY:", keys.includes("ADMIN_SECRET_KEY"));

export const FAUCET = ''
export const PLAYVERSE_NFT_CONTRACT = "0xa5fd4c217bf1f5e664b5b301729206aeab99ad9380edd3672b89ced1b61ac821"
export const ETHOS_EXAMPLE_COIN_TREASURY_CAP = "0xc4038ad78c21d473c946ca4c1b50eced5f11804dd70954d47d8b3332ef278b55"
// export const ETHOS_COIN_TYPE = `${ETHOS_EXAMPLE_CONTRACT}::ethos_example_coin::ETHOS_EXAMPLE_COIN`
