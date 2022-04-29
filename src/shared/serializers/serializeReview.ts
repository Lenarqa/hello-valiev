import { IReview } from "../models/models";

export const serializeReview = (reviewsArr: any[]):IReview[] => {
  console.log(reviewsArr);

  const reviews:IReview[] = reviewsArr.map((review) => {
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
  console.log(reviews)
  return reviews;
};
