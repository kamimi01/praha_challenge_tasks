import axios from "axios";

export class QiitaApiServices {
  private PAGE_NUM = 1;
  private SORT_TYPE = "count";
  public constructor() {}

  public async qiitaArticlesCategory(
    categoryNum: number
  ): Promise<Array<string>> {
    const isValidCategoryNum = categoryNum >= 1 && categoryNum <= 100;
    if (!isValidCategoryNum) {
      throw new Error("指定可能な値は1から100までです");
    }

    const baseUrl = "https://qiita.com/api/v2/tags";
    const params = {
      page: this.PAGE_NUM,
      per_page: categoryNum,
      sort: this.SORT_TYPE,
    };
    const response = await axios.get(baseUrl, {
      params: params,
    });

    const data = response.data;
    let categoryArr: string[] = [];

    for (let item of data) {
      categoryArr.push(item["id"]);
    }

    return categoryArr;
  }
}
