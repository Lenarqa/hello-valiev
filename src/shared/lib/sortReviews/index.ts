import { IReview } from "../../models/models";
export const sortByDate = (rewiews: IReview[]): IReview[] => {
  return rewiews.sort((review1, review2) => {
    const splitDateR1 = review1.date.split(".");
    const splitDateR2 = review2.date.split(".");

    const dateReview1: Date = new Date(
      `${splitDateR1[2]}-${splitDateR1[1]}-${splitDateR1[0]}`
    ); //year, mounth, day
    const dateReview2: Date = new Date(
      `${splitDateR2[2]}-${splitDateR2[1]}-${splitDateR2[0]}`
    ); //year, mounth, day

    return dateReview1 < dateReview2 ? 1 : -1;
  });
};
