import { includes } from "lodash";
import useValidationErrors from "./useValidationErrors";

const useValidationFieldError = (
  childId: string,
  inputType: string,
  inputName: string
) => {
  const { hasError, validationErrors } = useValidationErrors(childId);
  if (!hasError) {
    return { hasError: false };
  }
  const err = [inputType, inputName].toString();
  return { hasError: includes(validationErrors, err) };
};

export default useValidationFieldError;
