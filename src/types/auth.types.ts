export interface ISendOtp {
  email: string;
}

export interface IVerifyOtp {
  email: string;
  otp: string;
}

export interface ILogin {
  name?: string;
  email: string;
  phone?: string;
  division?: string;
  address?: string;
}
