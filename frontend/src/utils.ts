export const baseUrl = process.env.REACT_APP_API_URL;

export function getRequest(
  path: string,
  headers: Record<string, string> = {},
  queryParams: Record<string, string> = {}
) {
  const parameters = Object.entries(queryParams)
    .map((entry) => entry.join("="))
    .join("&");
  const url = parameters ? path + "?" + parameters : path;

  return fetch(baseUrl + url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
  }).then((response) => {
    if (!response.ok) throw new Error("Oops");
    return response.json();
  });
}

export function postRequest(
  path: string,
  data: any,
  headers: Record<string, string> = {}
) {
  return fetch(baseUrl + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) throw new Error("Oops");
    return response.json();
  });
}
