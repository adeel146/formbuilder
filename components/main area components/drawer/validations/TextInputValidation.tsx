import { Input } from "antd";
import { FC } from "react";

export interface IInputValidation {
  value: any;
  setValue: (str: any) => any;
  hasError?: boolean;
  onBlur?: () => void;
}

const TextInputValidation: FC<IInputValidation> = ({
  value,
  setValue,
  hasError,
  onBlur,
}) => {
  return (
    <>
      <Input
        onBlur={onBlur}
        style={hasError ? { border: "1px solid #DF4440" } : {}}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

export default TextInputValidation;
