import { useSections } from "components/states/global.state";
import { has } from "lodash";

const useErrors = (childId: string | undefined) => {
  const { errors } = useSections();
  return {
    hasError: has(errors, childId as any),
    errors: errors[childId as any],
  };
};

export default useErrors;
