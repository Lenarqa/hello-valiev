import { IReview } from "../../../shared/models/models";

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

export const serializeReview = (reviewsArr: any[]): IReview[] => {
  const reviews: IReview[] = reviewsArr.map((review) => {
    const date: Date = new Date(review.createdAt);

    const publishDate: string = `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}`;

    const updatedDateNoFormat: Date = new Date(review.updatedAt);
    const updateDate: string = `${updatedDateNoFormat.getDate()}.${
      updatedDateNoFormat.getMonth() + 1
    }.${updatedDateNoFormat.getFullYear()}`;

    return {
      id: review.id,
      name: review.authorName,
      imgUrl: review.authorImage,
      date: publishDate,
      title: review.title, //используем это поле при отправке запроса на добавление отзыва, хотя нигде нет импута для него.
      text: review.text,
      status: review.status,
      updateAt: updateDate,
      version: review.version,
    };
  });

  return reviews;
};
