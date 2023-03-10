import { Checkbox } from "antd";
import axios from "axios";
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import RErrorMessageItem from "./RErrorMessageItem";
import { IRendererTypeGeneric } from "./RTextInput";

const RCheckboxInput: FC<IRendererTypeGeneric> = ({
  options,
  baseForName,
  customValidationObject,
}) => {
  const { control } = useFormContext();
  const name = baseForName + options["field_id"];
  const {
    field: { onChange, value },
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
    defaultValue: options["default_value"] ?? [],
  });

  const selectedOption = options["list"];

  const { data: selectOptions = [] } = useQuery(
    ["list_options", selectedOption],
    () => axios.get(`/list_option/${selectedOption}`),
    {
      select: (res) => {
        return res.data?.data?.map((v: any) => ({
          label: v.text,
          value: v.id,
        }));
      },
      enabled: !!selectedOption,
    }
  );

  return (
    <RErrorMessageItem errors={errors} name={name} invalid={invalid}>
      <Checkbox.Group value={value} onChange={onChange}>
        {selectOptions.map((v: any) => {
          return (
            <div key={v.value} className="w-full pl-1 mb-1">
              <Checkbox value={v.value}>{v.label}</Checkbox>
            </div>
          );
        })}
      </Checkbox.Group>
    </RErrorMessageItem>
  );
};

export default RCheckboxInput;
