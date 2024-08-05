// 公共错误
export const common = {
  "10000001": "公共错误xxx1",
  "10000002": "公共错误xxx2",
  "10000013": "公共错误xxx3",
};
// 流理管
export const stream = {
  "10120001": "流错误xxx1",
  "10120002": "流错误xxx2",
  "10120003": "流错误xxx3",
};

// 节点管理
export const node = {
  "10122001": "节点错误1",
  "10122002": "节点错误2",
  "10122003": "节点错误3",
  // ...
};
export const noError = {
  "10175107": "noError",
  // 'othercode': 'noError',
};

export const errorMsg: Record<string, string> = {
  ...common,
  ...stream,
  ...node,
  ...noError,
};

export function getErrorMsg({
  code,
  message,
}: {
  code: string;
  message: string;
}) {
  switch (code) {
    case "10122006":
      return errorMsg[code].replace("{index}", message.split(":")[0]);
    default:
      return errorMsg[code] || message;
  }
}
