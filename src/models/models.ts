export interface IReview {
  id: number;
  name: string;
  imgUrl: string;
  date: string;
  text: string;
}

export interface FileModel {
  name: string;
  lastModified: number;
  webkitRelativePath: string;
  size: number;
  type: string;
}
