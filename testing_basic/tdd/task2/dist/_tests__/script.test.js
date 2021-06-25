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
    test("1 + 2 + 3が6であることをチェックする", function () {
        // Arrange
        // Act
        var actual = script_1.add(1, 2, 3);
        // Assert
        expect(actual).toBe(6);
    });
});
describe("渡された引数を引き算し、その計算結果を戻り値とする", function () {
    test("2 - 1が1であることをチェックする", function () {
        // Arrange
        // Act
        var actual = script_1.subtract(2, 1);
        // Assert
        expect(actual).toBe(1);
    });
    test("10 - 1 - 2が7であることをチェックする", function () {
        // Arrange
        // Act
        var actual = script_1.subtract(10, 1, 2);
        // Assert
        expect(actual).toBe(7);
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
    test("2 * 3 * 2が12であることをチェックする", function () {
        // Arrange
        // Act
        var actual = script_1.multiply(2, 3, 2);
        // Assert
        expect(actual).toBe(12);
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
    test("6 / 3 / 2が1であることをチェックする", function () {
        // Arrange
        // Act
        var actual = script_1.divide(6, 3, 2);
        // Assert
        expect(actual).toBe(1);
    });
});
describe("31個以上の引数を指定するとエラーが発生する", function () {
    test("31個以上の引数を指定するとエラーが発生する", function () {
        // Arrange
        // Act
        // Assert
        expect(function () {
            return script_1.add(2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
        }).toThrow(new Error("引数が31個以上指定されています"));
    });
});
describe("足し算の場合、計算結果が1000を超える場合は合計ではなく「too big」と文字列が返る", function () {
    test("500 + 501の場合、「too big」と文字列が返る", function () {
        // Arrange
        // Act
        var actual = script_1.add(500, 501);
        // Assert
        expect(actual).toBe("too big");
    });
});
describe("引き算の場合、計算結果がマイナスの場合は「negative number」と文字列が返る", function () {
    test("1 - 2の場合、「negative number」と文字列が返る", function () {
        // Arrange
        // Act
        var actual = script_1.subtract(1, 2);
        // Assert
        expect(actual).toBe("negative number");
    });
});
describe("かけ算の場合、計算結果が1000を越える場合は「big big number」と文字列が返る", function () {
    test("1 * 1001の場合、「big big number」と文字列が返る", function () {
        // Arrange
        // Act
        var actual = script_1.multiply(1, 1001);
        // Assert
        expect(actual).toBe("big big number");
    });
});
describe("割り算の場合、計算結果が整数ではない場合、小数点以下を切り捨てして整数で返す", function () {
    test("10 / 3が3であることをチェックする", function () {
        // Arrange
        // Act
        var actual = script_1.divide(10, 3);
        // Assert
        expect(actual).toBe(3);
    });
});
