import { IRowChildren, useSections } from "components/states/global.state";
import useFieldErrors from "hooks/useFieldErrors";
import { isEmpty } from "lodash";
import { FC } from "react";
import inputFieldsList from "../inputFieldsList";
import MainOptionsWrapper from "./Input options/components/MainOptionsWrapper";
import InputOptionsList, {
  IInputOptionsList,
} from "./Input options/InputOptionsList";

const OptionRenderer = () => {
  const { selectedColumnForOptionDialog, sections } = useSections();
  const [sectionId, rowId, index] = selectedColumnForOptionDialog.split(",");
  const section = sections.find((s) => s.id === sectionId);
  const row = section?.rows.find((r) => r.id === rowId);
  const currentChild = row?.children[+index];
  const selectedType = currentChild?.type;
  const foundType = inputFieldsList.find((i) => i.id === selectedType);
  const foundOptions = foundType?.options.map((option) => {
    return InputOptionsList.find((opt) => opt.id === option);
  }) as IInputOptionsList[];

  return (
    <>
      {foundOptions?.map((option) => (
        <SingleOption
          key={option.id}
          option={option}
          currentChild={currentChild}
          selectedType={selectedType}
        />
      ))}
    </>
  );
};

interface ISIngleOption {
  currentChild: IRowChildren | undefined | null;
  selectedType: string | undefined;
  option: IInputOptionsList;
}

const SingleOption: FC<ISIngleOption> = ({
  currentChild,
  option,
  selectedType,
}) => {
  const { changeInputOptionsValueGeneric, removeError, addError } =
    useSections();
  const { hasError } = useFieldErrors(
    currentChild?.id,
    option.keyFelidForOption
  );

  const getOtherFieldValue = (fieldKey: string) => {
    return currentChild?.options[fieldKey];
  };

  return (
    <MainOptionsWrapper key={option?.id} {...option}>
      <option.component
        hasError={hasError}
        childId={currentChild?.id}
        currentType={selectedType}
        getOtherFieldValue={getOtherFieldValue}
        disabled={option.id === "field_id"}
        value={currentChild?.options[option?.keyFelidForOption]}
        setValue={(value: string) =>
          changeInputOptionsValueGeneric(option?.keyFelidForOption, value)
        }
        onBlur={(val: any) => {
          if (hasError) {
            if (typeof val === "number" && !!val) {
              removeError(currentChild?.id as string, option.keyFelidForOption);
            } else if (!isEmpty(val)) {
              removeError(currentChild?.id as string, option.keyFelidForOption);
            }
          } else {
            if (!val) {
              addError(currentChild?.id as string, option.keyFelidForOption);
            }
          }
        }}
      />
    </MainOptionsWrapper>
  );
};

export default OptionRenderer;
