import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div>
      <Modal>
        {/* <BookPage params={Promise.resolve({ id: props.id })} /> */}
        <BookPage params={params} />
      </Modal>
    </div>
  );
}
