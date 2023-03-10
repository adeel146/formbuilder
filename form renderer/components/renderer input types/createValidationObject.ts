import { IInputValidationList } from "components/main area components/validationsInputFieldsList";
import { IRowValidations } from "components/states/global.state";
import { isArray } from "lodash";

interface ICreateValidationObject {
  currentInputValidation: IRowValidations[];
  allAvailableValidations: IInputValidationList[];
  allChildOptions: any;
}

export interface ICreateValidationObjectReturn {
  [key: string]: (value: any) => boolean | string | Promise<string | boolean>;
}

const createValidationObject: ({}: ICreateValidationObject) => ICreateValidationObjectReturn =
  ({ allAvailableValidations, currentInputValidation, allChildOptions }) => {
    const validationsObj: ICreateValidationObjectReturn = {};

    currentInputValidation.forEach((cv) => {
      const foundValidation = allAvailableValidations.find(
        (av) => av.type === cv.type
      );

      if (foundValidation) {
        validationsObj[foundValidation.type] = (value) => {
          if (value === "") return true;
          if (isArray(value) && value.length === 0) return true;
          return foundValidation.validationFunc(
            value,
            cv.errorMessage,
            cv.value,
            allChildOptions
          );
        };
      }
    });

    return validationsObj;
  };

export default createValidationObject;
