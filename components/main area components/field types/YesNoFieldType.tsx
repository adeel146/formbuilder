import { FC } from "react";

interface IYesNoFieldType {}

const YesNoFieldType: FC<IYesNoFieldType> = () => {
  return (
    <div className="flex">
      <div className="mr-1 bg-light_yes_no rounded-md font-medium h-[30px] w-[48px] flex justify-center items-center ">
        Yes
      </div>
      <div className="mr-1 bg-icon_light_grey text-white rounded-md font-medium h-[30px] w-[48px] flex justify-center items-center ">
        No
      </div>
    </div>
  );
};

export default YesNoFieldType;
