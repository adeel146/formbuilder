import { Input } from "antd";
import { MaskedInput } from "antd-mask-input";
import {
  convertToNumberSafely,
  countDecimals,
} from "components/main area components/validationsInputFieldsList";
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";
import RErrorMessageItem from "./RErrorMessageItem";
import { IRendererTypeGeneric } from "./RTextInput";

const RNumberInput: FC<IRendererTypeGeneric> = ({
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
        ...customValidationObject,
        ...(options["decimal_places"]
          ? {
              decimal_places: (v: any): boolean | string => {
                if (v === "") return true;

                return (
                  countDecimals(convertToNumberSafely(v)) <=
                    convertToNumberSafely(options["decimal_places"]) ||
                  `${options["decimal_places"]} Decimal places allowed!`
                );
              },
            }
          : {}),
      },
    },
    defaultValue: options["default_value"] ?? "",
  });

  const mask = options["mask_input_schema"]?.trim();

  return (
    <RErrorMessageItem errors={errors} name={name} invalid={invalid}>
      {mask ? (
        <MaskedInput
          mask={mask}
          value={value}
          ref={ref}
          onBlur={onBlur}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <Input
          value={value}
          ref={ref}
          onBlur={onBlur}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </RErrorMessageItem>
  );
};

export default RNumberInput;
