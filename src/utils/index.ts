/* eslint-disable object-shorthand */

import { ImageLoaderProps } from "next/image";

import { IFPS_URL } from "./constants";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const expirationValidator = (expiration: number, callFunction: any) => {
  if (expiration < Date.now()) {
    callFunction();
    location.reload();
  }
};

export const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (src.includes("https:")) {
    return `${src}?img-width=${width}&img-quality=${quality || 75}`;
  } else if (src.startsWith("Q")) {
    return `${IFPS_URL}${src}?img-width=${width}&img-quality=${quality || 75}`;
  } else {
    return `${src}`;
  }
};

export const generateArray = (n: number) => {
  return Array.from({ length: n }, (_, i) => i + 1);
};

export const sortByProperty = (property: string) => {
  return function (a: any, b: any) {
    if (a[property] > b[property]) return 1;
    else if (a[property] < b[property]) return -1;

    return 0;
  };
};

export const countOccurrences = (arr: any[], val: string | number) => {
  return arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
};

export const navigateHandler = (targetUrl: string, isNewWindow: boolean) => {
  if (isNewWindow) {
    open(targetUrl, "_blank");
  } else {
    location.href = targetUrl;
  }
};

export function arrayEquals(a: any[], b: any[]) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

export function removeArrayItem(array: any[], item: any) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      array.splice(i, 1);
    }
  }
  return array;
}

export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function reverseString(str: string) {
  return str.split("").reverse().join("");
}

export const delay = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

export const lowerObject = (obj: any) => {
  for (const prop in obj) {
    if (typeof obj[prop] === "string") {
      obj[prop] = obj[prop].toLowerCase();
    }
    if (typeof obj[prop] === "object") {
      lowerObject(obj[prop]);
    }
  }

  return obj;
};

export const upperFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getPercentage = (currentAmount: number, maxAmount: number) => {
  return (currentAmount / maxAmount) * 100;
};

export const getValueByStringfyNumberEn = stringfyNumber => {
  const result = stringfyNumber.replaceAll(".", "").replace(",", "");

  return parseFloat(result || 0) * 10;
};

export function rpcEndpoint(endPoints: string) {
  let rpcEndpoint = endPoints;
  if (rpcEndpoint.includes("|")) {
    const endpoints = rpcEndpoint?.split("|");
    rpcEndpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
  }

  return rpcEndpoint;
}

export const getStorage = (key: string) => {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : undefined;
};

export const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const formatVolume = (
  volume: string,
  medianRate = 0,
  dolarView = false,
): string => {
  let number =
    parseInt(volume?.replace(".", "").replace(",", "") || "0") /
    Math.pow(10, 8);

  if (dolarView) number *= medianRate / 1000;

  return number.toLocaleString("en-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const optimizedLoader = (img: string): string => {
  if (img) {
    return img?.startsWith("https://")
      ? `https://resizer.atomichub.io/images/v1/preview?ipfs=${img
          .split("/")
          .pop()}&size=1110&output=webp`
      : `https://resizer.atomichub.io/images/v1/preview?ipfs=${img}&size=370&output=webp`;
  }
  return "";
};

export const timeSinceTimestamp = timestamp => {
  const currentTimestamp = new Date().getTime();
  const timeDifference = currentTimestamp - timestamp;
  if (timeDifference < 60 * 60 * 1000) {
    const minutesSince = timeDifference / (1000 * 60);
    const minutesSinceRounded = Math.floor(minutesSince);
    return `${minutesSinceRounded} minute${
      minutesSinceRounded !== 1 ? "s" : ""
    } ago`;
  }
  const hoursSince = timeDifference / (1000 * 60 * 60);
  const hoursSinceRounded = Math.floor(hoursSince);

  return `${hoursSinceRounded} hour${hoursSinceRounded !== 1 ? "s" : ""} ago`;
};
