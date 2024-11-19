"use client";

import createRevieAction from "@/actions/create-review.action";
import styles from "./review_editor.module.css";
import { useActionState, useEffect } from "react"; // 리액트19버전부터

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, formAction, isPending] = useActionState(
    createRevieAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form className={styles.form_container} action={formAction}>
        <input required name="bookId" value={bookId} hidden readOnly />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰 내용"
        />
        <div className={styles.submit_container}>
          <input
            disabled={isPending}
            required
            name="author"
            placeholder="작성자"
          />
          <button disabled={isPending} type="submit">
            {isPending ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
