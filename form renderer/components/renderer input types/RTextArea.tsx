import { Input } from "antd";
import { IRowChildren } from "components/states/global.state";
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";
import RErrorMessageItem from "./RErrorMessageItem";
import { IRendererTypeGeneric } from "./RTextInput";

const RTextArea: FC<IRendererTypeGeneric> = ({
  options,
  baseForName,
  customValidationObject,
}) => {
  const { control } = useFormContext();
  const name = baseForName + options["field_id"];
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      required: {
        value: options["required"],
        message: `${options["name"]} is required`,
      },
      validate: customValidationObject,
    },
    defaultValue: options["default_value"] ?? "",
  });

  return (
    <RErrorMessageItem errors={errors} name={name} invalid={invalid}>
      <Input.TextArea
        value={value}
        ref={ref}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
      />
    </RErrorMessageItem>
  );
};

export default RTextArea;
