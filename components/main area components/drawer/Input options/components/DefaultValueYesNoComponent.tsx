import { FC } from "react";
import { useEffectOnce } from "react-use";

interface IDefaultValueYesNoComponent {
  value: any;
  setValue: (str: any) => any;
}

const DefaultValueYesNoComponent: FC<IDefaultValueYesNoComponent> = ({
  value,
  setValue,
}) => {
  useEffectOnce(() => {
    setValue(value ?? false);
  });
  return (
    <div className="flex">
      <div
        onClick={() => setValue(true)}
        className={`mr-1 hover:bg-primary cursor-pointer hover:text-white rounded-md font-medium h-[30px] w-[48px] flex justify-center items-center ${
          value ? "bg-primary text-white" : "bg-light_yes_no"
        } `}
      >
        Yes
      </div>
      <div
        onClick={() => setValue(false)}
        className={`mr-1 hover:bg-icon_light_grey hover:text-white cursor-pointer rounded-md font-medium h-[30px] w-[48px] flex justify-center items-center ${
          !value ? "bg-icon_light_grey text-white" : "bg-light_yes_no"
        } `}
      >
        No
      </div>
    </div>
  );
};

export default DefaultValueYesNoComponent;
