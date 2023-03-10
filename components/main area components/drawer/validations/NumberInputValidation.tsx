import { Input } from "antd";
import { FC } from "react";
import { IInputValidation } from "./TextInputValidation";

const NumberInputValidation: FC<IInputValidation> = ({
  value,
  setValue,
  hasError,
  onBlur,
}) => {
  return (
    <Input
      onBlur={onBlur}
      style={hasError ? { border: "1px solid #DF4440" } : {}}
      onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export default NumberInputValidation;
