export interface data {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface apiRequest {
  token: string;
  body: data;
  params: id;
}
export interface id {
  id: string;
}
export interface tokenRequest {
  headers: any;
  token: string;
}

export interface tokenResponse {
  send: (arg0: { result: string }) => void;
}

export const successMessages = {
  create: "User Created Successfully",
  update: "User Updated Successfully",
  delete: "User Deleted Successfully",
};

export const errorMessages = {
  notExist: "UserNot Exist",
  create: "User Not Created ",
  update: "User Not Updated ",
  delete: "User Not Deleted ",
  tokenExpired: "Token Is Expired",
};
