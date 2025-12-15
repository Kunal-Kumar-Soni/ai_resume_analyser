import { account } from "./appwrite";

export const getUserSession = async () => {
  try {
    const data = await account.get();
    return data;
  } catch (error) {
    return null;
  }
};
