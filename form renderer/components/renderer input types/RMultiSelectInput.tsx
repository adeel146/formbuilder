import { Select } from "antd";
import axios from "axios";
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import RErrorMessageItem from "./RErrorMessageItem";
import { IRendererTypeGeneric } from "./RTextInput";

const { Option } = Select;

const RMultiSelectInput: FC<IRendererTypeGeneric> = ({
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
    defaultValue: options["default_value"] ?? [],
  });

  const selectedOption = options["list"];

  const { data: selectOptions = [] } = useQuery(
    ["list_options", selectedOption],
    () => axios.get(`/list_option/${selectedOption}`),
    {
      select: (res) => {
        return res.data.data;
      },
      enabled: !!selectedOption,
    }
  );

  return (
    <RErrorMessageItem errors={errors} name={name} invalid={invalid}>
      <Select
        mode="multiple"
        ref={ref}
        onBlur={onBlur}
        value={value}
        className="w-full"
        onChange={onChange}
      >
        {selectOptions?.map((val: any) => (
          <Option key={val.id} value={val.id}>
            {val.text}
          </Option>
        ))}
      </Select>
    </RErrorMessageItem>
  );
};

export default RMultiSelectInput;
