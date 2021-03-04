import * as sut from "../../src/functions";
import { QiitaApiServices } from "../../src/qiitaApiServices"

jest.mock("../../src/qiitaApiServices")

describe("filterItems() test suite", () => {
    test("正常: 渡した配列の中にクエリで指定した文字列が1つだけ含まれている", () => {
        // Arrange
        const testData = ["react", "vue", "angular"];
        const query = "vue";
        const expected = ["vue"];

        // Act
        const actual = sut.filterItems(testData, query);

        // Assert
        expect(actual).toEqual(expected);
    })

    test("正常: 渡した配列の中にクエリで指定した文字列が複数含まれている", () => {
        // Arrange
        const testData = ["react", "redux", "vue", "vuex", "angular"];
        const query = "vue";
        const expected = ["vue", "vuex"];

        // Act
        const actual = sut.filterItems(testData, query);

        // Assert
        expect(actual).toEqual(expected);
    })

    test("正常: 渡した配列に要素が含まれていない", () => {
        // Arrange
        const testData: string[] = [];
        const query = "empty";
        const expected: string[] = [];

        // Act
        const actual = sut.filterItems(testData, query);

        // Aseert
        expect(actual).toEqual(expected)
    })

    test("正常: クエリ文字列が空文字である", () => {
        // Arrange
        const testData = ["react", "redux", "vue", "vuex", "angular"];
        const query = "";
        const expected = ["react", "redux", "vue", "vuex", "angular"];

        // Act
        const actual = sut.filterItems(testData, query);

        // Assert
        expect(actual).toEqual(expected);
    })
})

describe("asyncFilterItems() test suite", () => {
    test("正常: 渡した配列の中にクエリで指定した文字列が1つだけ含まれている", async () => {
        // Arrange
        const testData = ["react", "vue", "angular"];
        const query = "vue";
        const expected = ["vue"];

        // Act
        const actual = await sut.asyncFilterItems(testData, query);

        // Assert
        expect.assertions(1)
        expect(actual).toEqual(expected);
    })

    test("正常: 渡した配列の中にクエリで指定した文字列が複数含まれている", async () => {
        // Arrange
        const testData = ["react", "redux", "vue", "vuex", "angular"];
        const query = "vue";
        const expected = ["vue", "vuex"];

        // Act
        const actual = await sut.asyncFilterItems(testData, query);

        // Assert
        expect.assertions(1)
        expect(actual).toEqual(expected);
    })

    test("正常: 渡した配列に要素が含まれていない", async () => {
        // Arrange
        const testData: string[] = [];
        const query = "empty";
        const expected: string[] = [];

        // Act
        const actual = await sut.asyncFilterItems(testData, query);

        // Aseert
        expect.assertions(1)
        expect(actual).toEqual(expected)
    })

    test("正常: クエリ文字列が空文字である", async () => {
        // Arrange
        const testData = ["react", "redux", "vue", "vuex", "angular"];
        const query = "";
        const expected = ["react", "redux", "vue", "vuex", "angular"];

        // Act
        const actual = await sut.asyncFilterItems(testData, query);

        // Assert
        expect.assertions(1)
        expect(actual).toEqual(expected);
    })
})

describe("getArticlesCategory() test suite", () => {
    const qiitaApiServiceMock = QiitaApiServices as jest.MockedClass<typeof QiitaApiServices>

    beforeEach(() => {
        qiitaApiServiceMock.mockReset();
    })

    test("正常: Qiita記事のカテゴリを配列として受け取る", async () => {
        // Arrange
        const categoryNum = 3
        const testData = ["JavaScript", "TypeScript", "React"];
        const expected = testData;

        qiitaApiServiceMock.prototype.qiitaArticlesCategory.mockResolvedValueOnce(testData);

        // Act
        const actual = await sut.getArticlesCategory(qiitaApiServiceMock.prototype, categoryNum)

        // Assert
        expect.assertions(1);
        expect(actual).toEqual(expected);
    })

    test("異常: qiitaApiServiceから異常例外が送出される", async () => {
        // Arrange
        const categoryNum = 3
        const testData = ["JavaScript", "TypeScript", "React"];
        const expected: string[] = [];

        qiitaApiServiceMock.prototype.qiitaArticlesCategory.mockRejectedValueOnce(new Error());

        // Act
        const actual = await sut.getArticlesCategory(qiitaApiServiceMock.prototype, categoryNum)

        // Assert
        expect.assertions(1);
        expect(actual).toEqual(expected);
    })
})