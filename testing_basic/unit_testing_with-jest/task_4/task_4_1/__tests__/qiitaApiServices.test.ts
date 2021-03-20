import axios from "axios";
import { QiitaApiServices } from "../src/qiitaApiServices";

describe("", () => {
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

    const received = await qiitaApiServices.qiitaArticlesCategory(categoryNum);

    expect.assertions(1);
    expect(received).toContain(expected);
  });

  test("[正常系]正しいカテゴリ数99が指定されるケース", async () => {
    const categoryNum = 99;
    const expected = "Swift";
    const testData = {
      data: [{ id: expected }],
    };
    axiosSpy.mockResolvedValue(testData);

    const received = await qiitaApiServices.qiitaArticlesCategory(categoryNum);

    expect.assertions(1);
    expect(received).toContain(expected);
  });

  test("[異常系]誤ったカテゴリ数0が指定されるケース", async () => {
    const categoryNum = 0;
    const expectedErrorMsg = "指定可能な値は1から100までです";

    expect.assertions(1);
    await expect(
      qiitaApiServices.qiitaArticlesCategory(categoryNum)
    ).rejects.toThrow(new Error(expectedErrorMsg));
  });

  test("[異常系]誤ったカテゴリ数101が指定されるケース", async () => {
    const categoryNum = 101;
    const expectedErrorMsg = "指定可能な値は1から100までです";

    expect.assertions(1);
    await expect(
      qiitaApiServices.qiitaArticlesCategory(categoryNum)
    ).rejects.toThrow(new Error(expectedErrorMsg));
  });
});
