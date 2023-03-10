import { includes } from "lodash";
import useErrors from "./useError";

const useFieldErrors = (childId: string | undefined, keyField: string) => {
  const { hasError, errors } = useErrors(childId);
  if (!hasError) {
    return { hasError };
  }

  return { hasError: includes(errors, keyField) };
};

export default useFieldErrors;
