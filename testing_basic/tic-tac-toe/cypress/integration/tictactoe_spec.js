describe("Tic Tac Toe", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const squareEl = "[data-e2e=square]";
  const statusEl = "[data-e2e=status]";
  const moveEl = "[data-e2e=move]";
  const textAssert = "have.text";
  const textNotContainAssert = "not.contain";

  it("丁がゲームに勝利する", () => {
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
  });

  it("引き分けになる", () => {
    // 交互にマスを選択し、表示されるプレイヤーが正しいことをチェックする
    cy.get(squareEl)
      .eq(6)
      .click()
      .should(textAssert, "丁")
      .get(moveEl)
      .eq(0)
      .should(textAssert, "Go to game start");
    cy.get(squareEl)
      .eq(2)
      .click()
      .should(textAssert, "半")
      .get(moveEl)
      .eq(1)
      .should(textAssert, "Go to move #1");
    cy.get(squareEl)
      .eq(8)
      .click()
      .should(textAssert, "丁")
      .get(moveEl)
      .eq(2)
      .should(textAssert, "Go to move #2");
    cy.get(squareEl)
      .eq(0)
      .click()
      .should(textAssert, "半")
      .get(moveEl)
      .eq(3)
      .should(textAssert, "Go to move #3");
    cy.get(squareEl)
      .eq(4)
      .click()
      .should(textAssert, "丁")
      .get(moveEl)
      .eq(4)
      .should(textAssert, "Go to move #4");
    cy.get(squareEl)
      .eq(3)
      .click()
      .should(textAssert, "半")
      .get(moveEl)
      .eq(5)
      .should(textAssert, "Go to move #5");
    cy.get(squareEl)
      .eq(5)
      .click()
      .should(textAssert, "丁")
      .get(moveEl)
      .eq(6)
      .should(textAssert, "Go to move #6");
    cy.get(squareEl)
      .eq(7)
      .click()
      .should(textAssert, "半")
      .get(moveEl)
      .eq(7)
      .should(textAssert, "Go to move #7");
    cy.get(squareEl)
      .eq(1)
      .click()
      .should(textAssert, "丁")
      .get(moveEl)
      .eq(8)
      .should(textAssert, "Go to move #8")
      .get(moveEl)
      .eq(9)
      .should(textAssert, "Go to move #9");

    // 引き分けメッセージが表示されることをチェックする
    cy.get(statusEl).should(textAssert, "Draw!");

    // 勝利メッセージが表示されないことをチェックする
    cy.get(statusEl).should(textNotContainAssert, "Winner:");
  });
});
