import {useDeleteProductMutation} from "../features/apiSlice";
import {Modal} from "./Modal";

type Props = {
  del: boolean;
  setDel: (val: boolean) => void;
  id: number;
};

export const DeleteConfirm = ({del, setDel, id}: Props) => {
  const [deleteProduct, _product] = useDeleteProductMutation();
  return (
    <Modal condition={del}>
      <div className="bg-white rounded-xl flex flex-col items-center w-1/2 p-4">
        <p className="text-lg mb-4">Are you sure?</p>
        <div className="flex justify-around w-full">
          <button className="button" onClick={() => deleteProduct(id)}>
            Confirm
          </button>
          <button className="button" onClick={() => setDel(false)}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};
