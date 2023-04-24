import {
  useEditProductMutation,
  useGetSingleProductQuery,
} from "../features/apiSlice";
import {IComment} from "../interfaces/IComment";

type Props = {
  comment: IComment;
};

export const SingleComment = ({comment}: Props) => {
  const {data} = useGetSingleProductQuery(comment.productId.toString());

  const [deleteComment, _product] = useEditProductMutation();

  const deleteCommentHandler = (id: number) => {
    console.log(comment.id);
    console.log(id);

    const filteredComments = data?.comments.filter(
      (comment: IComment) => comment.id !== id
    );
    const productWithoutComment = {...data, comments: filteredComments};
    deleteComment({id: data?.id, product: productWithoutComment});
  };

  return (
    <div className="mb-2 bg-white flex justify-between rounded items-center p-1">
      <p className="px-2">{comment.description}</p>
      <button
        onClick={() => deleteCommentHandler(comment.id)}
        className="button"
      >
        Delete
      </button>
    </div>
  );
};
