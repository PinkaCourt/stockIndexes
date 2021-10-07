import { ErrorResponse, RestType, Data, ErrorRequest } from "./types";
import { DataTF, Payload } from "containers/Tinkoff/types";
/*
function handleError(error: ErrorRequest) {
  return Promise.resolve({ data: undefined, error });
}
*/
function handleBodyParse(
  responseBody: Promise<Data>
  // responseBody: Promise<Data>
  //responseBody: Promise<Data | undefined>,
  //status: number
) {
  return responseBody.then(
    (data) => Promise.resolve(data)
    /*() => {
      const requestError = { status, messageKey: "error.parsing_body" };

      throw requestError;
    }*/
  );
}

export function deserialize(response: Response) {
  const { status } = response;

  if (!response.ok) {
    const requestError = { status, messageKey: "error.request" };
    throw requestError;
  }

  return handleBodyParse(
    response.json()
    //, status
  );
}
//: Promise<SuccessResponse<T> | ErrorResponse>
//: Promise<ResponseSuccess<T> | ResponseError>
// типы ок у промиса и реджект
function deriveDataFromJson<T>(data: { payload: T } | T): T {
  if ("payload" in data) {
    return data.payload;
  }

  return data;
}

export function fetchRequest<T>(
  url: string,
  options: RequestInit
  //body: BodyInit
): Promise<T | ErrorResponse> {
  return (
    fetch(url, options)
      // .then(deserialize);
      .then((response) => response.json().then(deriveDataFromJson))
  );
  //.then(deriveDataFromJson)
  //.then((data) => Promise.resolve(data))
  //.then((data) => Promise.resolve(data)as Data)
  //.then((data): responseTF => ({payload}))
  //.then((data) => ({ data }))
  // .then((data: Data) => ({data, error: undefined}))
  // .catch(handleError)
}

/*

export function getPolicies(domainNodeId?: number, userNodeId?: number) {
  const query = adaptQuery({ domainNodeId, userNodeId });
  const rawURL = `${API_V3}/ac-backend/policies`;
  const requestURL = addQuery(query, rawURL);
  const method = 'GET';

  return createAuthRequest<Policy[]>(requestURL, method);// то что возвращает
}

*/

export interface UploadFileOptions {
  method: RestType;
  headers: { [key: string]: string };
  body: BodyInit;
  //body: Document | BodyInit | null;
}
