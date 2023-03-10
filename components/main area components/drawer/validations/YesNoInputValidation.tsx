import { Select } from "antd";
import { FC } from "react";
import { IInputValidation } from "./TextInputValidation";

const { Option } = Select;

const YesNoInputValidation: FC<IInputValidation> = ({
  value,
  setValue,
  hasError,
  onBlur,
}) => {
  return (
    <Select
      onSelect={onBlur}
      onClear={onBlur}
      style={hasError ? { border: "1px solid #DF4440" } : {}}
      value={value}
      className="w-full"
      onChange={(value) => setValue(value)}
    >
      <Option value={true}>Yes</Option>
      <Option value={false}>No</Option>
    </Select>
  );
};

export default YesNoInputValidation;
