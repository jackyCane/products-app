import {useState} from "react";
import {IProduct} from "../interfaces/IProduct";
import {DeleteConfirm} from "./DeleteConfirm";
import {Link} from "react-router-dom";
type Props = {
  product: IProduct;
};

export const Product = ({product}: Props) => {
  const [del, setDel] = useState(false);

  return (
    <div className="flex justify-between w-full border-2 rounded-full pl-4 mb-3 items-center">
      <Link to={`/products/${product.id}`}>
        <div>{product.name}</div>
      </Link>

      <div>
        <button
          onClick={() => setDel(true)}
          className=" rounded-full py-2 px-3 bg-black hover:bg-slate-600 transition-all duration-300 text-white"
        >
          Delete
        </button>
        {del && <DeleteConfirm id={product.id} del={del} setDel={setDel} />}
      </div>
    </div>
  );
};
