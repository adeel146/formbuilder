import { Input } from "antd";
import { ErrorDeleteIcon } from "components/icons.list";
import { validation_label_types } from "components/main area components/validationsTypeLabels";
import { IRowValidations, useSections } from "components/states/global.state";
import useValidationFieldError from "hooks/useValidationFieldError";
import { FC } from "react";
import { ErrorText } from "../Input options/components/ListSelectTypeComponent";

interface ISingleErrorCard extends IRowValidations {
  index: number;
  InputComponent: any;
  childId: string;
}

const SingleErrorCard: FC<ISingleErrorCard> = ({
  type,
  InputComponent,
  errorMessage,
  value,
  index,
  childId,
}) => {
  const { hasError: valueError } = useValidationFieldError(
    childId,
    type,
    "value"
  );
  const { hasError: messageError } = useValidationFieldError(
    childId,
    type,
    "errorMessage"
  );

  const {
    setInputValidationValue,
    deleteValidationRuleToInput,
    checkValidationError,
    removeValidationError,
    addValidationError,
  } = useSections();
  const label = validation_label_types.find((vlt) => vlt.type === type)?.label;

  return (
    <div className="bg-error_box_bg border p-4 mb-3">
      <div className="flex justify-between items-center">
        <div className="font-semibold">{label} </div>
        <div
          onClick={() => {
            deleteValidationRuleToInput(index);
            if (valueError) {
              const err = [type, "value"].toString();
              removeValidationError(childId as string, err);
            }

            if (messageError) {
              const err = [type, "errorMessage"].toString();
              removeValidationError(childId as string, err);
            }
          }}
          className=" cursor-pointer"
        >
          <ErrorDeleteIcon />
        </div>
      </div>
      <div className="mt-3">
        <InputComponent
          hasError={valueError}
          value={value}
          setValue={(value: any) => {
            setInputValidationValue(index, {
              value,
              errorMessage,
            });
          }}
          onBlur={() => {
            const err = [type, "value"].toString();
            if (valueError && !!value) {
              removeValidationError(childId as string, err);
            } else if (!valueError && !value) {
              addValidationError(childId as string, err);
            }
          }}
        />
      </div>
      {valueError && <ErrorText>Please add value!</ErrorText>}
      <div className="mt-1">
        {errorMessage === undefined ? (
          <div
            onClick={() => {
              setInputValidationValue(index, {
                value,
                errorMessage: "",
              });
            }}
            className="text-xs text-primary_drawer_icon font-medium cursor-pointer"
          >
            Customize error message
          </div>
        ) : (
          <div className="mt-3">
            <div className="flex justify-between items-center text-xs font-medium ">
              <div className="text-icon_light_grey">Custom error message</div>
              <div
                onClick={() => {
                  setInputValidationValue(index, {
                    value,
                    errorMessage: undefined,
                  });

                  if (messageError) {
                    const err = [type, "errorMessage"].toString();
                    removeValidationError(childId as string, err);
                  }
                }}
                className="text-red-600 cursor-pointer"
              >
                Remove
              </div>
            </div>
            <div className="mt-1">
              <Input
                style={messageError ? { border: "1px solid #DF4440" } : {}}
                value={errorMessage}
                onChange={(e) => {
                  setInputValidationValue(index, {
                    value,
                    errorMessage: e.target.value,
                  });
                }}
                onBlur={() => {
                  const err = [type, "errorMessage"].toString();

                  if (messageError && !!errorMessage) {
                    removeValidationError(childId as string, err);
                  } else if (!messageError && !errorMessage) {
                    addValidationError(childId as string, err);
                  }
                }}
              />
            </div>
            {messageError && <ErrorText>Please add error message!</ErrorText>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleErrorCard;
