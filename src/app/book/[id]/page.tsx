import ReviewEditor from "@/components/review_editor";
import ReviewItem from "@/components/review_item";
import { BookData, IReviewData } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

// 1,2,3 외의 것들은 다 404로 보냄
// export const dynamicParams = false;

// page router에서의 getStaticPath와 같은 역할
export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const books: BookData[] = await response.json();

  return books.map((book) => ({
    id: book.id.toString(),
  }));
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`,
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const book: BookData = await response.json();
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={styles.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        {/* <img src={coverImgUrl} /> */}
        <Image
          src={coverImgUrl}
          width={240}
          height={300}
          alt={`도서 ${title}의 표지 이미지`}
        />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.subTitle}>{subTitle}</div>
      <div className={styles.author}>
        {author} | {publisher}
      </div>
      <div className={styles.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    {
      next: { tags: [`review-${bookId}`] },
    }
  );

  if (!response.ok) {
    throw new Error(`Review fetch failed: ${response.statusText}`);
  }

  const reviews: IReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((item) => (
        <ReviewItem key={item.id} {...item} />
      ))}
    </section>
  );
}

// 현재페이지의 메타 데이터를 동적으로 생성하는 역할.
export async function generateMetadata({
  params,
}: {
  params: Promise<{
    id: number;
  }>;
}): Promise<Metadata> {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const book: BookData = await response.json();

  return {
    title: `${book.title}: 한입 북스`,
    description: `${book.description}의 검색 결과`,
    openGraph: {
      title: `${book.title}: 한입 북스`,
      description: `${book.description}의 검색 결과`,
      images: [book.coverImgUrl],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className={styles.container}>
      <BookDetail bookId={(await params).id} />
      <ReviewEditor bookId={(await params).id} />
      <ReviewList bookId={(await params).id} />
    </div>
  );
}
