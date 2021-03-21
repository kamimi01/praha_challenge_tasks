import { add, subtract, multiply, divide } from "../src/script";

describe("渡された引数を足し算し、その計算結果を返す", () => {
  test("1 + 2が3であることをチェックする", () => {
    // Arrange
    // Act
    const actual = add(1, 2);
    // Assert
    expect(actual).toBe(3);
  });

  test("2 + 3が5であることをチェックする", () => {
    // Arrange
    // Act
    const actual = add(2, 3);
    // Assert
    expect(actual).toBe(5);
  });

  test("1 + 2 + 3が6であることをチェックする", () => {
    // Arrange
    // Act
    const actual = add(1, 2, 3);
    // Assert
    expect(actual).toBe(6);
  });
});

describe("渡された引数を引き算し、その計算結果を戻り値とする", () => {
  test("2 - 1が2であることをチェックする", () => {
    // Arrange
    // Act
    const actual = subtract(2, 1);
    // Assert
    expect(actual).toBe(1);
  });

  test("2 - 1 - 10が-9であることをチェックする", () => {
    // Arrange
    // Act
    const actual = subtract(2, 1, 10);
    // Assert
    expect(actual).toBe(-9);
  });
});

describe("渡された引数を掛け算し、その計算結果を戻り値とする", () => {
  test("2 * 3 * 2が12であることをチェックする", () => {
    // Arrange
    // Act
    const actual = multiply(2, 3, 2);
    // Assert
    expect(actual).toBe(12);
  });
});

describe("渡された引数を割り算し、その計算結果を戻り値とする", () => {
  test("6 / 3 / 2が1であることをチェックする", () => {
    // Arrange
    // Act
    const actual = divide(6, 3, 2);
    // Assert
    expect(actual).toBe(1);
  });
});
