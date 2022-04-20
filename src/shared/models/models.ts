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