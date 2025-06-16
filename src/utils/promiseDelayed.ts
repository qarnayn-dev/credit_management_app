/// A utility to simulate a delay
export const promiseDelayed = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
