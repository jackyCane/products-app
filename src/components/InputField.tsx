type Props = {
  name: string;
  changeInputs: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export const InputField = ({name, changeInputs, value}: Props) => {
  return (
    <input
      value={value}
      className="border-2 border-gray-500 rounded-xl w-full mb-2 px-3 py-1"
      onChange={changeInputs}
      name={name}
      placeholder={`Enter ${name}`}
      type="text"
    />
  );
};
