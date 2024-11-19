import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { Metadata } from "next";
import style from "./page.module.css";

// export const dynamic = "force-dynamic";
// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정 (권장하진 않음, 매커니즘을 무시하니까)
// 1. auto: 기본값, 아무것도 강제하지않음
// 2. force-dynamic: 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static: 페이지를 강제로 Static 페이지로 설정
// 4. error: 페이지를 강제로 Static 페이지로 설정(But 동적함수나, 캐싱하지 않는 데이터 페칭등이 있을땐 -> 빌드 오류를 발생시킴)

async function Allbooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`
    // { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allbooks: BookData[] = await response.json();

  return (
    <div>
      {allbooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`
    // { next: { revalidate: 3 } }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "한입 북스",
  description: "합입 북스에 등록된 도서를 만나보세요",
  openGraph: {
    title: "한입 북스",
    description: "합입 북스에 등록된 도서를 만나보세요",
    images: ["/thumbnail.png"], // public 디렉토리 아래
  },
};

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {/* <Suspense fallback={<BookListSkeleton count={3} />}> */}
        <RecoBooks />
        {/* </Suspense> */}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {/* <Suspense fallback={<BookListSkeleton count={10} />}> */}
        <Allbooks />
        {/* </Suspense> */}
      </section>
    </div>
  );
}
