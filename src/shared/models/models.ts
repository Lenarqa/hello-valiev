export interface IReview {
  id: string;
  name: string;
  imgUrl: string | null;
  date: string;
  text: string;
  title: string;
  status: string;
  updateAt: string;
  version: number;
}

export interface IReviewPost {
  authorName: string;
  title: string;
  text: string;
  captchaKey: string;
  captchaValue: string;
}

export interface FileModel {
  name: string;
  lastModified: number;
  webkitRelativePath: string;
  size: number;
  type: string;
}

export interface IParticipant {
  id: string;
  name: string;
  imgUrl: string;
  aboutMe: string;
  status: string;
}

export interface IOption {
  id: number | string;
  value: string;
}

export interface IMyInfo {
  id: string;
  name: string;
  miniImgUrl: string;
  mainImgUrl: string;
  birthday: string;
  city: number;
  gender: number;
  year: number;
  smallAboutMe: string;
  aboutMeText: string;
  pet: number;
}

export interface IValidationResult {
  result: boolean;
  errorMsg: string;
}

export interface IUser {
  email: string;
  password: string;
}

export interface IErrorRequest {
  statusCode: number;
  message: string;
  error: string;
}

export interface ITostData {
  title: string;
  msg: string;
}

export interface IPostImg {
  reviewID: string;
  photo: File;
}
