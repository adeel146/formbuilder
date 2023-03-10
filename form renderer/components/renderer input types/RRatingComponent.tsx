import StarRating from "components/main area components/ReactSvgStarRating/StarRating";
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";
import RErrorMessageItem from "./RErrorMessageItem";
import { IRendererTypeGeneric } from "./RTextInput";

const RRatingComponent: FC<IRendererTypeGeneric> = ({
  options,
  baseForName,
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
    },
    defaultValue: options["default_value"] ?? "",
  });

  return (
    <RErrorMessageItem errors={errors} name={name} invalid={invalid}>
      <StarRating
        initialRating={value ?? 0}
        handleOnClick={(rating) => onChange(rating)}
        size={24}
        containerClassName="flex"
      />
    </RErrorMessageItem>
  );
};

export default RRatingComponent;
