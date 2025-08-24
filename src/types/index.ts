import type { ComponentType } from "react";

export type { ISendOtp, IVerifyOtp, ILogin } from "./auth.types";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

type ZodIssue = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

type ErrorSource = {
  path: string;
  message: string;
};

export interface IErrorResponse {
  success: boolean;
  message: string;
  errorSource?: ErrorSource[];
  err?: {
    issues: ZodIssue[];
    name: string;
  };
  stack?: string;
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export interface PStatus {
  ACTIVE: "ACTIVE";
  INACTIVE: "INACTIVE";
  STOCK_OUT: "STOCK_OUT";
}

export interface IProduct {
  name?: string;
  slug?: string;
  category?: string;
  price?: number;
  costPrice?: number;
  status?: PStatus;
  description?: string;
  image?: string;
  createdAt?: Date;
}
