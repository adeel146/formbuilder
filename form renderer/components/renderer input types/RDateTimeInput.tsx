import { DatePicker } from "antd";
import moment from "moment";
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";
import RErrorMessageItem from "./RErrorMessageItem";
import { IRendererTypeGeneric } from "./RTextInput";

const RDateTimeInput: FC<IRendererTypeGeneric> = ({
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
      <DatePicker
        showTime={{ format: "hh:mm A" }}
        className="w-full"
        format="YYYY-MM-DD hh:mm A"
        placeholder="YYYY-MM-DD HH:MM"
        ref={ref}
        value={value ? moment(value) : null}
        onChange={(date) => onChange(date?.toDate() ?? "")}
        onBlur={onBlur}
      />
    </RErrorMessageItem>
  );
};

export default RDateTimeInput;
