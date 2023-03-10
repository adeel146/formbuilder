import { Input } from "antd";
import { FC } from "react";
import { ErrorText } from "./ListSelectTypeComponent";

interface IInputOptionComponent {
  value: any;
  setValue: (str: any) => any;
  hasError: boolean;
  onBlur: (str: any) => any;
  disabled: boolean;
}

const InputOptionComponent: FC<IInputOptionComponent> = ({
  value,
  setValue,
  hasError,
  onBlur,
  disabled,
}) => {
  return (
    <>
      <Input
        disabled={disabled}
        style={hasError ? { border: "1px solid #DF4440" } : {}}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => onBlur(value)}
      />
      {hasError && <ErrorText>Please add value</ErrorText>}
    </>
  );
};

export default InputOptionComponent;
