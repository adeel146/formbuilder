import { InputNumber } from "antd";
import { FC } from "react";
import { IInputValidation } from "./TextInputValidation";

const CurrencyInputValidation: FC<IInputValidation> = ({
  value,
  setValue,
  hasError,
  onBlur,
}) => {
  return (
    <InputNumber
      value={value}
      placeholder="$"
      formatter={(v) => `${v ?? 0}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      parser={(v) => `${v ?? 0}`.replace(/\$\s?|(,*)/g, "")}
      onChange={(v) => {
        setValue(v);
      }}
      onBlur={onBlur}
      style={
        hasError
          ? { border: "1px solid #DF4440", width: "100%" }
          : { width: "100%" }
      }
    />
  );
};

export default CurrencyInputValidation;
