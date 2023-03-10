import { Button, Dropdown } from "antd";
import inputFieldsList from "components/main area components/inputFieldsList";
import { IInputValidationList } from "components/main area components/validationsInputFieldsList";
import { validation_label_types } from "components/main area components/validationsTypeLabels";
import { IRowValidations, useSections } from "components/states/global.state";
import { FC } from "react";
import { useToggle } from "react-use";
import SingleErrorCard from "./SingleErrorCard";

const ValidationRenderer: FC = () => {
  const [isOpen, setIsOpen] = useToggle(false);
  const { selectedColumnForOptionDialog, sections, validationErrors } =
    useSections();
  const [sectionId, rowId, index] = selectedColumnForOptionDialog.split(",");
  const section = sections.find((s) => s.id === sectionId);
  const row = section?.rows.find((r) => r.id === rowId);
  const currentChild = row?.children[+index];
  const validationList = inputFieldsList.find(
    (fl) => fl.id === currentChild?.type
  )?.validations;

  return (
    <div>
      <div>
        {currentChild?.validations.map((validation, index) => {
          const InputComponent = validationList?.find(
            (v) => v.type === validation.type
          )?.inputComponent;
          return (
            <SingleErrorCard
              childId={currentChild.id}
              InputComponent={InputComponent}
              {...validation}
              index={index}
              key={index}
            />
          );
        })}
      </div>
      <Dropdown
        transitionName=""
        overlay={() => (
          <ValidationOptionsRenderer
            currentValidations={currentChild?.validations ?? []}
            setIsOpen={setIsOpen}
            validationList={validationList}
          />
        )}
        visible={isOpen}
      >
        <Button onClick={setIsOpen} className="mt-4" type="primary">
          <div className="font-medium">Add a validation rule</div>
        </Button>
      </Dropdown>
    </div>
  );
};

export default ValidationRenderer;

interface IValidationOptionsRenderer {
  validationList: IInputValidationList[] | undefined;
  setIsOpen: () => void;
  currentValidations: IRowValidations[];
}

const ValidationOptionsRenderer: FC<IValidationOptionsRenderer> = ({
  validationList,
  setIsOpen,
  currentValidations,
}) => {
  const { addValidationRuleToInput } = useSections();

  return (
    <div
      className={`border flex bg-white shadow-lg flex-wrap  ${
        (validationList?.length as any) > 6 ? "max-w-[400px]" : "flex-col"
      }`}
    >
      {validationList?.map((validation) => {
        const label = validation_label_types.find(
          (vlt) => vlt.type === validation.type
        )?.label;

        const disabled = currentValidations.find(
          (cv) => cv.type === validation.type
        );

        return (
          <div
            onClick={() => {
              if (disabled) return;
              addValidationRuleToInput(
                validation.type,
                validation.defaultValue
              );
              setIsOpen();
            }}
            className={`${
              validationList.length > 6 && "w-6/12"
            } px-4 py-2 font-medium cursor-pointer ${
              disabled && "cursor-not-allowed opacity-50"
            }`}
            key={label}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};
