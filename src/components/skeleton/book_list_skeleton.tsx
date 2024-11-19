import BookItemSkeleton from "./book_item_skeleton";

export default function BookListSkeleton({ count }: { count: number }) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => <BookItemSkeleton key={`book-item-skeleton-${idx}`} />);
}
