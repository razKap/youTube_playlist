export function extractParamsFromUrl(url) {
  let splitedUrl = [];
  splitedUrl = url.split("?");
  if (splitedUrl.length < 1) return [];
  let q = new URLSearchParams(splitedUrl[1]);
  const vv = q.get("v");
  return vv;
}
