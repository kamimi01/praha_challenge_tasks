describe("My First", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Tic-Tac-Toeアプリケーションを訪れる", () => {
    // Arrange - アプリケーションの初期状態のセットアップ
    // - webページを訪れる
    // - elementでクエリする
    // Act
    // Assert
    // - ページのコンテントに関してAssertする

    expect(true).to.equal(true);
  });
});
