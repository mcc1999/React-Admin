export interface ResBase {
  code: string;
  message: string;
}

export interface ResCommon<T> extends ResBase {
  code: string;
  data: T;
  message: string;
}

/** 通用列表结构 */
export interface ResList<T> extends ResBase {
  data: {
    items: T[];
    total: number;
    page: number;
    perPage: number;
  };
}

export interface ParamsPage {
  page: number;
  perPage: number;
}
