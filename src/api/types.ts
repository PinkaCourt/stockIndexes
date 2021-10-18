import { DataTF } from "containers/Tinkoff/types";
import { DataMOEX } from "containers/Moex/types";

export type RestType = "GET" | "POST";

export interface Data {
  data: DataTF | DataMOEX;
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

export interface SuccessResponse<Data> {
  data: Data;
}

export type ReturnTypePromise<T extends (...args: any) => any> =
  ReturnType<T> extends Promise<infer U> ? U : never;
