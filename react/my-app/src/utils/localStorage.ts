export const getItem = (key: string): any => {
  return JSON.parse(localStorage.getItem(key)!);
};
export const setItem = (key: string, date: Array<any>) => {
  return localStorage.setItem(key, JSON.stringify(date));
};
