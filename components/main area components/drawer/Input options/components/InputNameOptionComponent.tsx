import { Input } from "antd";
import { useSections } from "components/states/global.state";
import { FC, useEffect } from "react";
import { ErrorText } from "./ListSelectTypeComponent";

interface IInputNameOptionComponent {
  value: any;
  setValue: (str: any) => any;
  hasError: boolean;
  onBlur: (str: any) => any;
  getOtherFieldValue: (str: any) => any;
}

const InputNameOptionComponent: FC<IInputNameOptionComponent> = ({
  value,
  setValue,
  hasError,
  onBlur,
  getOtherFieldValue,
}) => {
  const { changeInputOptionsValueGeneric } = useSections();

  useEffect(() => {
    const fieldIdValue = getOtherFieldValue("field_id");
    changeInputOptionsValueGeneric(
      "field_id",
      value.replace(/[\W_]/g, "_") + "_" + fieldIdValue.split("_").pop()
    );
  }, [changeInputOptionsValueGeneric, value]);
  return (
    <>
      <Input
        style={hasError ? { border: "1px solid #DF4440" } : {}}
        onBlur={() => {
          if (value.trim() === "") {
            setValue("United Field");
          }
          onBlur(value);
        }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      {hasError && <ErrorText>Please add value</ErrorText>}
    </>
  );
};

export default InputNameOptionComponent;
