import { IReviewData } from "@/types";
import styles from "./review_item.module.css";
import ReviewDeletebutton from "./review_item_delete_button";

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  bookId,
}: IReviewData) {
  return (
    <div className={styles.container}>
      <div className={styles.author}>{author}</div>
      <div className={styles.content}>{content}</div>
      <div className={styles.bottom_container}>
        <div className={styles.date}>
          {new Date(createdAt).toLocaleString()}
        </div>
        <ReviewDeletebutton reviewId={id} bookId={bookId} />
      </div>
    </div>
  );
}
