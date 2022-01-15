const host = "http://localhost:8080/api";
const url = (path) => `${host}/${path}`;

const header = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const get = async (path) => {
  // resp => 取ってきたURLのこと
  const resp = await fetch(url(path));
  checkError(resp.status);
  const result = await resp.json();

  return result;
};

export const post = async (path, body) => {
  // JSON.stringify() => JSON型に変換する関数
  const options = { ...header, method: "POST", body: JSON.stringify(body) };
  const resp = await fetch(url(path), options);
  checkError(resp.status);
  const result = await resp.json();

  return result;
};

export const deleteRequest = async (path) => {
  const options = { method: "DELETE" };
  const resp = await fetch(url(path), options);
  checkError(resp.status);

  await fetch(url(path), options);

  return;
};

const checkError = (status) => {
  if (status >= 400) {
    throw new Error("エラーが発生しました。時間を置いて再度お試しください。");
  }
};
