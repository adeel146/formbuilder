import inputFieldsList from "components/main area components/inputFieldsList";
import { ISectionRow, RowTypeEnum } from "components/states/global.state";
import { FC } from "react";
import createValidationObject from "../renderer input types/createValidationObject";
import rInputTypesConfig from "../renderer input types/rInputTypes.config";
import DefaultInputWrapper from "./DefaultInputWrapper";

interface ISingleRow extends ISectionRow {
  sectionId: string;
}

const SingleRow: FC<ISingleRow> = ({ type, children, sectionId }) => {
  const childClasses = rowTypes.find((rt) => rt.type === type)?.childClasses;
  return (
    <div className="flex flex-wrap">
      {children.filter(Boolean).map((child, index) => {
        const FoundInputType = rInputTypesConfig.find(
          (rif) => rif.id === child?.type
        );

        const { hideNameAndHelpText } =
          (inputFieldsList.find((input) => input.id === child?.type) as any) ??
          {};

        const customValidationObject = createValidationObject({
          allAvailableValidations: FoundInputType?.validations ?? [],
          currentInputValidation: child?.validations ?? [],
          allChildOptions: child?.options,
        });

        const baseForName = `${sectionId}.`;

        return (
          <div key={index} className={`${childClasses} p-1`}>
            <DefaultInputWrapper
              hideNameAndHelpText={!!hideNameAndHelpText}
              options={child?.options}
            >
              {FoundInputType && (
                <FoundInputType.InputComponent
                  baseForName={baseForName}
                  {...child}
                  sectionId={sectionId}
                  customValidationObject={customValidationObject}
                />
              )}
            </DefaultInputWrapper>
          </div>
        );
      })}
    </div>
  );
};

export default SingleRow;

interface IRowTypes {
  type: RowTypeEnum;
  childClasses: string;
}

const rowTypes: IRowTypes[] = [
  {
    type: "single",
    childClasses: "w-full",
  },
  {
    type: "double",
    childClasses: "w-full md:w-6/12",
  },
  {
    type: "triple",
    childClasses: "md:w-4/12 w-full",
  },
];
