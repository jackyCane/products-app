import {useState} from "react";
import {useParams} from "react-router-dom";
import {useGetSingleProductQuery} from "../features/apiSlice";
import {Comments} from "./Comments";
import {Edit} from "./Edit";
type Props = {};

export const ProductPage = (props: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const {id} = useParams<{id?: string}>();
  const {data} = useGetSingleProductQuery(id as string);
  console.log(data);

  return !data ? (
    <div className="flex w-full min-h-screen justify-center">
      <h1>Loading...</h1>
    </div>
  ) : (
    <div className="w-screen h-screen">
      <div className="grid grid-cols-2 h-2/3 border-2">
        <div className="">
          <img
            className="w-full object-cover"
            src={data?.imageUrl}
            alt="product-image"
          />
        </div>
        <div className="flex flex-col justify-center items-center p-4">
          <div className="flex bg-gray-700 text-white w-full rounded-2xl h-2/3 flex-col justify-evenly items-center mb-2">
            <p className="font-bold mb-4 uppercase text-xl">{data.name}</p>
            <div className="flex gap-8">
              <div className="flex flex-col justify-center items-center">
                <p>
                  <span className="font-bold">Count:</span> {data.count}
                </p>
                <p>
                  <span className="font-bold">Weight:</span> {data.weight}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p>
                  <span className="font-bold">Heigth: </span>
                  {data.size.height}
                </p>
                <p>
                  <span className="font-bold">Width: </span>
                  {data.size.width}
                </p>
              </div>
            </div>
            <div>
              <button onClick={() => setEdit(true)} className="button">
                Edit
              </button>
            </div>
          </div>
        </div>
        {edit && <Edit edit={edit} setEdit={setEdit} data={data} />}
      </div>
      <Comments data={data} />
    </div>
  );
};
