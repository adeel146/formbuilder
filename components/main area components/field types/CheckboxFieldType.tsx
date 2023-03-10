import { Checkbox } from "antd";

const CheckboxFieldType = () => {
  const options = ["Option 1", "Option 2", "Option 3"];
  return (
    <div className="flex flex-col">
      {options.map((option) => (
        <div className="flex mb-2" key={option}>
          <Checkbox disabled />
          <div className="ml-1 font-medium">{option}</div>
        </div>
      ))}
    </div>
  );
};

export default CheckboxFieldType;
