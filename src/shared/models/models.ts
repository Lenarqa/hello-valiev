export interface IReview {
  id: number;
  name: string;
  imgUrl: string;
  date: string;
  text: string;
  status: number;
}

export interface FileModel {
  name: string;
  lastModified: number;
  webkitRelativePath: string;
  size: number;
  type: string;
}

export interface IParticipant {
  id: number;
  name: string;
  imgUrl: string;
  aboutMe: string;
  status: number;
}

export interface IOption {
  id: number;
  value: string;
}

export interface IMyInfo {
  name: string;
  miniImgUrl: string;
  mainImgUrl: string;
  birthday: string;
  city: string;
  gender: string;
  year: number;
  aboutMeText: string;
  pet: string;
}
