import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";
import RErrorMessageItem from "./RErrorMessageItem";
import { IRendererTypeGeneric } from "./RTextInput";

const RYesNoCheckbox: FC<IRendererTypeGeneric> = ({
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
    defaultValue: options["default_value"] ?? false,
  });

  return (
    <RErrorMessageItem errors={errors} name={name} invalid={invalid}>
      <div onBlur={onBlur} ref={ref} className="flex">
        <div
          onClick={() => onChange(true)}
          className={`mr-1 hover:bg-primary cursor-pointer hover:text-white rounded-md font-medium h-[30px] w-[48px] flex justify-center items-center ${
            value ? "bg-primary text-white" : "bg-light_yes_no"
          } `}
        >
          Yes
        </div>
        <div
          onClick={() => onChange(false)}
          className={`mr-1 hover:bg-icon_light_grey hover:text-white cursor-pointer rounded-md font-medium h-[30px] w-[48px] flex justify-center items-center ${
            !value ? "bg-icon_light_grey text-white" : "bg-light_yes_no"
          } `}
        >
          No
        </div>
      </div>
    </RErrorMessageItem>
  );
};

export default RYesNoCheckbox;
