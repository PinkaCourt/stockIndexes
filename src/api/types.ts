import { DataTF } from "containers/Tinkoff/types";

export type RestType = "GET" | "POST";

export interface Data {
  data: DataTF;
}

export interface responseOptions {
  auth: boolean;
  method: RestType;
  headers: { [key: string]: string };
  body: Document | BodyInit | null;
}

export interface ErrorRequest {
  status: number;
  messageKey: string;
}

export interface ErrorResponse {
  error: ErrorRequest; //FormattedMessageError;
  data: undefined; //| Data;
}

export interface SuccessResponse<Data> {
  data: Data;
  // error: undefined;
}

export type ReturnTypePromise<T extends (...args: any) => any> =
  ReturnType<T> extends Promise<infer U> ? U : never;
