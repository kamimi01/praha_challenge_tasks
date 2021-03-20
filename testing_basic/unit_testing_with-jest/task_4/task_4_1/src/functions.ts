import { QiitaApiServices } from "../src/qiitaApiServices";

export const filterItems = (arr: string[], query: string) => {
  return arr.filter((el: string) => el.toLowerCase().includes(query));
};

export const asyncFilterItems = (arr: string[], query: string) => {
  return new Promise((resolve): void => {
    resolve(filterItems(arr, query));
  });
};

export const getArticlesCategory = async (
  qiitaApiServices: QiitaApiServices,
  categoryNum: number
): Promise<Array<string>> => {
  let categoryArr: string[] = [];

  try {
    categoryArr = await qiitaApiServices.qiitaArticlesCategory(categoryNum);
  } catch (e) {
    // console.log(e);
  }

  return categoryArr;
};
