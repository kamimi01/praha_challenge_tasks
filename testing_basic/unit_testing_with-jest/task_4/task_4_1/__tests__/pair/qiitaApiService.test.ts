import { QiitaApiServices } from "../../src/qiitaApiServices";
import axios from "axios";

describe("QiitaApiService class test suite", () => {

    let axiosSpy: jest.SpyInstance;
    let sut: QiitaApiServices;

    beforeEach(() => {
        axiosSpy = jest.spyOn(axios, "get");
        sut = new QiitaApiServices();
    })

    afterEach(() => {
        axiosSpy.mockReset();
    })

    test("正常: カテゴリ数に1を指定する", async () => {
        // Arrange
        const categoryNum = 1;
        const testData = {
            data: [
                {
                    id: "test1"
                },
                {
                    id: "test2"
                }
            ]
        }
        axiosSpy.mockImplementationOnce(() => {
            return testData;
        })
        const expected = ["test1", "test2"]

        // Act
        const actual = await sut.qiitaArticlesCategory(categoryNum);

        // Assert
        expect.assertions(1);
        expect(actual).toEqual(expected);
    });

    test("正常: カテゴリ数に１を指定して、レスポンス結果なし", async () => {
        // Arrange
        const categoryNum = 1;
        const testData = {
            data: []
        }
        axiosSpy.mockImplementationOnce(() => {
            return testData;
        })
        const expected: string[] = [];

        // Act
        const actual = await sut.qiitaArticlesCategory(categoryNum);

        // Assert
        expect.assertions(1);
        expect(actual).toEqual(expected);
    });

    test("異常: カテゴリ数に0を指定する", async () => {
        // Arrange
        const categoryNum = 0;
        const expectedErrorMsg = "指定可能な値は1から100までです";

        // Act
        // Assert
        expect.assertions(1)
        await expect(
            sut.qiitaArticlesCategory(categoryNum)
        ).rejects.toThrow(new Error(expectedErrorMsg));
    });

    test("異常: カテゴリ数に101を指定する", async () => {
        // Arrange
        const categoryNum = 101;
        const expectedErrorMsg = "指定可能な値は1から100までです";

        // Act
        // Assert
        expect.assertions(1)
        await expect(
            sut.qiitaArticlesCategory(categoryNum)
        ).rejects.toThrow(new Error(expectedErrorMsg));
    });
});