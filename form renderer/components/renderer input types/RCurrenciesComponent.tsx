import { Input, InputNumber, Select } from "antd";
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";
import RErrorMessageItem from "./RErrorMessageItem";
import { IRendererTypeGeneric } from "./RTextInput";
import currencyList from "currency-list";
import {
  convertToNumberSafely,
  countDecimals,
} from "components/main area components/validationsInputFieldsList";

const RCurrenciesComponent: FC<IRendererTypeGeneric> = ({
  options,
  baseForName,
  customValidationObject,
}) => {
  const { control } = useFormContext();
  const inputName = `${baseForName}${options["field_id"]}.value`;
  const currencySelectName = `${baseForName}${options["field_id"]}.currency`;
  const accepted_currencies = options["accepted_currencies"] ?? [];
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name: inputName,
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

  const {
    field: {
      onChange: selectOnChange,
      onBlur: selectOnBlur,
      value: selectValue,
      ref: selectRef,
    },
  } = useController({
    name: currencySelectName,
    control,
    rules: {
      required: {
        value: options["required"],
        message: `${options["name"]} is required`,
      },
    },
    defaultValue: accepted_currencies[0] ?? "",
  });

  const selectOptions = Object.values(currencyList.getAll("en_US"))
    .filter((c) => accepted_currencies.includes(c.code))
    .map((curr) => ({
      label: curr.code,
      value: curr.code,
    }));

  return (
    <RErrorMessageItem errors={errors} name={inputName} invalid={invalid}>
      <InputNumber
        value={value}
        ref={ref}
        onBlur={onBlur}
        onChange={(e) => onChange(e)}
        placeholder={currencyList.get(selectValue)?.symbol ?? ""}
        formatter={(v) => `${v ?? 0}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        parser={(v) => `${v ?? 0}`.replace(/\$\s?|(,*)/g, "")}
        addonAfter={
          accepted_currencies.length > 1 ? (
            <Select
              ref={selectRef}
              onBlur={selectOnBlur}
              className="w-full"
              value={selectValue}
              onChange={(newValue) => {
                selectOnChange(newValue);
              }}
              options={selectOptions}
            />
          ) : (
            accepted_currencies[0] ?? ""
          )
        }
      />
    </RErrorMessageItem>
  );
};

export default RCurrenciesComponent;
