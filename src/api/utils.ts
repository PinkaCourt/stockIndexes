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

export function errorParse({ name, message }: Error) {
  const responseError = { name, message };

  throw responseError;

  return responseError;
}

function deriveDataFromJson<T>(data: { payload: T } | T): T {
  if ("payload" in data) {
    return data.payload;
  }

  return data;
}

export function fetchRequest<T>(
  url: string,
  options: RequestInit
): Promise<Data | ErrorRequest | Error> {
  return fetch(url, options)
    .then((response) => deserialize(response).then(deriveDataFromJson))
    .catch((error) => errorParse(error));
}
