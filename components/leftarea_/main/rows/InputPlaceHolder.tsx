import { DragSectionPlusIcon } from "components/icons.list";
import { FC } from "react";

const InputPlaceHolder: FC = () => {
  return (
    <div className={`input-placeholders`}>
      <DragSectionPlusIcon />
      <div className="ml-1">Drag here</div>
    </div>
  );
};

export default InputPlaceHolder;
