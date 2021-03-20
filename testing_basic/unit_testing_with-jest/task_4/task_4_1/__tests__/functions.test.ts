import {
  filterItems,
  asyncFilterItems,
  getArticlesCategory,
} from "../src/functions";
import { QiitaApiServices } from "../src/qiitaApiServices";
import axios from "axios";

describe("filterItemsの単体テスト", () => {
  test("[正常系]正しい引数が渡されるケース", () => {
    const testData = ["apple", "banana", "grapes", "mango", "orange"];
    const query = "ap";
    const expected = ["apple", "grapes"];

    const received = filterItems(testData, query);

    expect(received).toMatchObject(expected);
  });

  test("[正常系]引数の配列が空のケース", () => {
    const testData: string[] = [];
    const query = "ap";
    const expected: string[] = [];

    const received = filterItems(testData, query);

    expect(received).toMatchObject(expected);
  });

  test("[正常系]引数のクエリが空文字のケース", () => {
    const testData = ["apple", "banana", "grapes", "mango", "orange"];
    const query = "";
    const expected = testData;

    const received = filterItems(testData, query);

    expect(received).toMatchObject(expected);
  });

  test("[正常系]引数の配列が空かつクエリが空文字のケース", () => {
    const testData: string[] = [];
    const query = "";
    const expected = testData;

    const received = filterItems(testData, query);

    expect(received).toMatchObject(expected);
  });
});

describe("asyncFilterItemsの単体テスト", () => {
  test("[正常系]正しい引数が渡されるケース", async () => {
    const testData = ["apple", "banana", "grapes", "mango", "orange"];
    const query = "ap";
    const expected = ["apple", "grapes"];

    const received = await asyncFilterItems(testData, query);

    expect.assertions(1);
    expect(received).toMatchObject(expected);
  });

  test("[正常系]引数の配列が空のケース", async () => {
    const testData: string[] = [];
    const query = "ap";
    const expected: string[] = [];

    const received = await filterItems(testData, query);

    expect.assertions(1);
    expect(received).toMatchObject(expected);
  });

  test("[正常系]引数のクエリが空文字のケース", async () => {
    const testData = ["apple", "banana", "grapes", "mango", "orange"];
    const query = "";
    const expected = testData;

    const received = await filterItems(testData, query);

    expect.assertions(1);
    expect(received).toMatchObject(expected);
  });

  test("[正常系]引数の配列が空かつクエリが空文字のケース", async () => {
    const testData: string[] = [];
    const query = "";
    const expected = testData;

    const received = await filterItems(testData, query);

    expect.assertions(1);
    expect(received).toMatchObject(expected);
  });
});

describe("getArticlesCategoryの単体テスト", () => {
  jest.mock("axios");
  const axiosSpy = jest.spyOn(axios, "get");
  let qiitaApiServices: QiitaApiServices;
  beforeEach(() => {
    qiitaApiServices = new QiitaApiServices();
  });

  test("[正常系]正しいカテゴリ数1が指定されるケース", async () => {
    const categoryNum = 1;
    const expected = "Swift";
    const testData = {
      data: [{ id: expected }],
    };

    axiosSpy.mockResolvedValue(testData);

    const received = await getArticlesCategory(qiitaApiServices, categoryNum);

    expect.assertions(1);
    expect(received).toContain(expected);
  });

  test("[正常系]正しいカテゴリ数99が指定されるケース2", async () => {
    const categoryNum = 99;
    const expected = "Swift";
    const expected2 = "Deno";
    const testData = {
      data: [{ id: expected }, { id: expected2 }],
    };

    axiosSpy.mockResolvedValue(testData);

    const received = await getArticlesCategory(qiitaApiServices, categoryNum);

    expect.assertions(2);
    expect(received).toContain(expected);
    expect(received).toContain(expected2);
  });

  test("[異常系]誤ったカテゴリ数0が指定されるケース", async () => {
    const categoryNum = 0;
    const expected: string[] = [];

    const received = await getArticlesCategory(qiitaApiServices, categoryNum);

    expect.assertions(1);
    expect(received).toEqual(expected);
  });

  test("[異常系]誤ったカテゴリ数101が指定されるケース", async () => {
    const categoryNum = 101;
    const expected: string[] = [];

    const received = await getArticlesCategory(qiitaApiServices, categoryNum);

    expect.assertions(1);
    expect(received).toEqual(expected);
  });
});
