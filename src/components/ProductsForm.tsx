import {InputField} from "./InputField";
import {useState} from "react";
import {useAddProductMutation} from "../features/apiSlice";
import {Modal} from "./Modal";
import {IInputs} from "../interfaces/IInputs";
interface Props {
  form: boolean;
  setForm: (val: boolean) => void;
}

export const ProductsForm = ({form, setForm}: Props) => {
  const [inputs, setInputs] = useState<IInputs>({
    name: "",
    image: "",
    count: "",
    weight: "",
    height: "",
    width: "",
  });
  const [addProduct, _product] = useAddProductMutation();

  const changeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setInputs({...inputs, [name]: value});
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !inputs.name ||
      !inputs.count ||
      !inputs.image ||
      !inputs.height ||
      !inputs.weight ||
      !inputs.width
    )
      return;
    const newProduct = {
      name: inputs.name,
      imageUrl: inputs.image,
      count: Number(inputs.count),
      weight: inputs.weight,
      size: {
        height: Number(inputs.height),
        width: Number(inputs.width),
      },
    };
    setInputs({
      name: "",
      image: "",
      count: "",
      weight: "",
      height: "",
      width: "",
    });
    addProduct(newProduct);
    setForm(false);
  };

  return (
    <Modal condition={form}>
      <form
        className="w-1/2 bg-white border-2 flex flex-col p-4 rounded-xl"
        onSubmit={onSubmit}
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
            onClick={() => setForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};
