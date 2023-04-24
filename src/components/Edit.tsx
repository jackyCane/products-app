import {useState} from "react";
import {useEditProductMutation} from "../features/apiSlice";
import {IInputs} from "../interfaces/IInputs";
import {IProduct} from "../interfaces/IProduct";
import {InputField} from "./InputField";
import {Modal} from "./Modal";
type Props = {
  data: IProduct;
  edit: boolean;
  setEdit: (val: boolean) => void;
};

export const Edit = ({data, edit, setEdit}: Props) => {
  const [editProduct, _product] = useEditProductMutation();
  const [inputs, setInputs] = useState<IInputs>({
    name: data.name,
    image: data.imageUrl,
    count: String(data.count),
    weight: data.weight,
    height: String(data.size.height),
    width: String(data.size.width),
  });

  const changeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setInputs({...inputs, [name]: value});
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editedProduct = {
      name: inputs.name,
      imageUrl: inputs.image,
      count: Number(inputs.count),
      weight: inputs.weight,
      size: {
        height: Number(inputs.height),
        width: Number(inputs.width),
      },
      comments: data.comments,
    };
    editProduct({id: data.id, product: editedProduct});
    setEdit(false);
  };
  return (
    <Modal condition={edit}>
      <form
        onSubmit={onSubmit}
        className="w-1/2 bg-white border-2 flex flex-col p-4 rounded-xl"
      >
        <div className="mb-2">
          <InputField
            value={inputs.name}
            changeInputs={changeInputs}
            name={"name"}
          />
          <InputField
            value={inputs.image}
            changeInputs={changeInputs}
            name={"image"}
          />
          <InputField
            value={inputs.count}
            changeInputs={changeInputs}
            name={"count"}
          />
          <InputField
            value={inputs.weight}
            changeInputs={changeInputs}
            name={"weight"}
          />
          <div className="flex gap-4">
            <InputField
              value={inputs.height}
              changeInputs={changeInputs}
              name={"height"}
            />
            <InputField
              value={inputs.width}
              changeInputs={changeInputs}
              name={"width"}
            />
          </div>
        </div>
        <div className="flex w-full justify-around">
          <button className="button" type="submit">
            Submit
          </button>
          <button
            type="button"
            className="button"
            onClick={() => setEdit(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};
