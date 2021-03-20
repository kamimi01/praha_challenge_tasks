describe("My First", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("丁がゲームに勝利する", () => {
    // Arrange
    // Act
    const squareEl = "[data-e2e=square]";
    const statusEl = "[data-e2e=status]";
    const moveEl = "[data-e2e=move]";
    const textAssert = "have.text";

    // 交互にマスを選択し、表示されるプレイヤーが正しいことをチェックする
    cy.get(squareEl)
      .eq(2)
      .click()
      .should(textAssert, "丁")
      .get(moveEl)
      .eq(0)
      .should(textAssert, "Go to game start");
    cy.get(squareEl)
      .eq(5)
      .click()
      .should(textAssert, "半")
      .get(moveEl)
      .eq(1)
      .should(textAssert, "Go to move #1");
    cy.get(squareEl)
      .eq(4)
      .click()
      .should(textAssert, "丁")
      .get(moveEl)
      .eq(2)
      .should(textAssert, "Go to move #2");
    cy.get(squareEl)
      .eq(8)
      .click()
      .should(textAssert, "半")
      .get(moveEl)
      .eq(3)
      .should(textAssert, "Go to move #3");
    cy.get(squareEl)
      .eq(6)
      .click()
      .should(textAssert, "丁")
      .get(moveEl)
      .eq(4)
      .should(textAssert, "Go to move #4");

    // 勝利メッセージが正しいことをチェックする
    cy.get(statusEl).should(textAssert, "Winner: 丁");

    expect(true).to.equal(true);
  });
});
