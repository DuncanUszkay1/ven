export function stripQueryParams(rawUrl: string) {
  return rawUrl.split('?')[0];
}