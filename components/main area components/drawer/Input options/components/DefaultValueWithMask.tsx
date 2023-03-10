import { Input } from "antd";
import { MaskedInput } from "antd-mask-input";
import { FC } from "react";
import { ErrorText } from "./ListSelectTypeComponent";

interface IInputOptionComponent {
  value: any;
  setValue: (str: any) => any;
  hasError: boolean;
  onBlur: (str: any) => any;
  disabled: boolean;
  getOtherFieldValue: (str: string) => any;
}

const DefaultValueWithMask: FC<IInputOptionComponent> = ({
  value,
  setValue,
  hasError,
  onBlur,
  disabled,
  getOtherFieldValue,
}) => {
  const mask = getOtherFieldValue("mask_input_schema")?.trim();

  return (
    <>
      {mask ? (
        <MaskedInput
          mask={mask}
          disabled={disabled}
          style={hasError ? { border: "1px solid #DF4440" } : {}}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => onBlur(value)}
        />
      ) : (
        <Input
          disabled={disabled}
          style={hasError ? { border: "1px solid #DF4440" } : {}}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => onBlur(value)}
        />
      )}

      {hasError && <ErrorText>Please add value</ErrorText>}
    </>
  );
};

export default DefaultValueWithMask;
