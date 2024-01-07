/* eslint-disable import/no-anonymous-default-export */
import { customAlphabet } from "nanoid";

export default (host: string) => {
  const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYSabcdefghijklmnopqrstuvwxyz0123456789", 6);
  const shortCode = nanoid();
  return {
    shortCode,
    shortUrl: `http://${host}/api/${shortCode}`,
  };
};