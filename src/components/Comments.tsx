import {useState} from "react";
import {useEditProductMutation} from "../features/apiSlice";
import {IProduct} from "../interfaces/IProduct";
import {SingleComment} from "./SingleComment";

type Props = {
  data: IProduct;
};

export const Comments = ({data}: Props) => {
  const [addComment, _comment] = useEditProductMutation();
  console.log(data);

  const [comment, setComment] = useState<string>("");
  const timeCorrection = (time: number) => (time < 10 ? "0" + time : time);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) return;
    const date = new Date();
    const hours = timeCorrection(date.getHours());
    const minutes = timeCorrection(date.getMinutes());
    const localDateString = date.toLocaleDateString();

    const newComment = {
      id: Math.random(),
      productId: data.id,
      description: comment,
      date: `${hours}:${minutes} ${localDateString}`,
    };
    const updatedProduct = {...data, comments: [...data.comments, newComment]};
    console.log(updatedProduct);

    addComment({id: data.id, product: updatedProduct});
    setComment("");
  };

  return (
    <div className="flex flex-col h-1/3  bg-indigo-900 py-4 justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="flex mb-4 items-center justify-between"
      >
        <textarea
          onChange={(e) => setComment(e.target.value)}
          className="border-2 rounded-xl px-4 py-1  mr-4"
          placeholder="Leave yor comment"
          cols={70}
          rows={2}
          value={comment}
        />
        <button className="button" type="submit">
          Send
        </button>
      </form>
      <div className="w-full flex justify-center overflow-y-auto">
        <div className="w-5/6 rounded-xl p-4">
          <p className="uppercase text-white text-center font-bold mb-2">
            comments
          </p>
          {data?.comments?.length === 0 && (
            <h2 className="text-white   text-center">
              There are no comments yet
            </h2>
          )}
          {data?.comments?.map((comment) => (
            <SingleComment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};
