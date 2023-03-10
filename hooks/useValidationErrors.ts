import { useSections } from "components/states/global.state";
import { has } from "lodash";

const useValidationErrors = (childId: string | undefined) => {
  const { validationErrors } = useSections();

  return {
    hasError: has(validationErrors, childId as any),
    validationErrors: validationErrors[childId as any],
  };
};

export default useValidationErrors;
