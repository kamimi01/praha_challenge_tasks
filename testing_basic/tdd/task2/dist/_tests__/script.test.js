"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var script_1 = require("../src/script");
describe("渡された引数を足し算し、その計算結果を返す", function () {
    test("1 + 2が3であることをチェックする", function () {
        // Arrange
        // Act
        var actual = script_1.add(1, 2);
        // Assert
        expect(actual).toBe(3);
    });
    test("2 + 3が5であることをチェックする", function () {
        // Arrange
        // Act
        var actual = script_1.add(2, 3);
        // Assert
        expect(actual).toBe(5);
    });
});
describe("渡された引数を引き算し、その計算結果を戻り値とする", function () {
    test("2 - 1が2であることをチェックする", function () {
        // Arrange
        // Act
        var actual = script_1.subtract(2, 1);
        // Assert
        expect(actual).toBe(1);
    });
});
describe("渡された引数を掛け算し、その計算結果を戻り値とする", function () {
    test("2 * 3が6であることをチェックする", function () {
        // Arrange
        // Act
        var actual = script_1.multiply(2, 3);
        // Assert
        expect(actual).toBe(6);
    });
});
describe("渡された引数を割り算し、その計算結果を戻り値とする", function () {
    test("6 / 3が2であることをチェックする", function () {
        // Arrange
        // Act
        var actual = script_1.divide(6, 3);
        // Assert
        expect(actual).toBe(2);
    });
});
