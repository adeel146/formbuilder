import { Input } from "antd";
import { EmailInputIcon } from "components/icons.list";
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";
import { string } from "yup";
import RErrorMessageItem from "./RErrorMessageItem";
import { IRendererTypeGeneric } from "./RTextInput";

const REmailInput: FC<IRendererTypeGeneric> = ({
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
      validate: {
        email: (v) =>
          string().email().isValidSync(v) || "Enter a valid email address",
        ...customValidationObject,
      },
    },
    defaultValue: options["default_value"] ?? "",
  });

  return (
    <RErrorMessageItem errors={errors} name={name} invalid={invalid}>
      <Input
        value={value}
        ref={ref}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        addonAfter={<EmailInputIcon />}
      />
    </RErrorMessageItem>
  );
};

export default REmailInput;
