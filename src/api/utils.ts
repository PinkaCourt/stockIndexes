import { Data, ErrorRequest } from "./types";

function handleBodyParse(responseBody: Promise<Data | ErrorRequest>) {
  return responseBody.then((data) => Promise.resolve(data));
}

export function deserialize(response: Response) {
  const { status } = response;

  if (!response.ok) {
    const requestError: ErrorRequest = { status, messageKey: "error.request" };

    throw requestError;
  }

  return handleBodyParse(response.json());
}

function deriveDataFromJson<T extends object>(data: { payload: T } | T): T {
  if ("payload" in data) {
    return data.payload;
  }

  return data;
}

export function fetchRequest<Response>(
  url: string,
  options?: RequestInit
): Promise<Response | Error> {
  return fetch(url, options)
    .then((response) => deserialize(response).then(deriveDataFromJson))
    .catch((error) => error);
}
