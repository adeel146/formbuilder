import { DragSectionPlusIcon } from "components/icons.list";
import { FC } from "react";

const AttachmentFieldType: FC = () => {
  return (
    <div className="flex">
      <div className="rounded-sm cursor-pointer border border-slate-300 w-[80px] h-[80px] flex justify-center items-center fill-slate-500">
        <div className="transform scale-[2]">
          <DragSectionPlusIcon />
        </div>
      </div>
    </div>
  );
};

export default AttachmentFieldType;
