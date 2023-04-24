import {useState} from "react";
import {useGetProductsQuery} from "../features/apiSlice";
import {IProduct} from "../interfaces/IProduct";
import {Product} from "./Product";
import {ProductsForm} from "./ProductsForm";

type Props = {};

export const Main = () => {
  const {data} = useGetProductsQuery();
  const [form, setForm] = useState<boolean>(false);
  return (
    <div className="relative w-screen h-screen border-2 flex flex-col items-center">
      {data && <h1 className="mb-2">There are no products yet</h1>}
      <div className="mb-4">
        <button className="button" onClick={() => setForm(true)}>
          Add new product
        </button>
      </div>
      <div className="w-full px-12">
        {data?.map((product: IProduct) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      {form && <ProductsForm form={form} setForm={setForm} />}
    </div>
  );
};
