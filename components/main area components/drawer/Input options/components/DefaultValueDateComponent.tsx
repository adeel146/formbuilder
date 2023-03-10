import { DatePicker } from "antd";
import { FC } from "react";
import moment from "moment";

interface IDefaultValueDateComponent {
  value: any;
  setValue: (str: any) => any;
}

const DefaultValueDateComponent: FC<IDefaultValueDateComponent> = ({
  value,
  setValue,
}) => {
  return (
    <>
      <DatePicker
        className="w-full"
        placeholder="YYYY-MM-DD"
        value={value ? moment(value) : undefined}
        onChange={(date) => setValue(date?.toDate())}
      />
    </>
  );
};

export default DefaultValueDateComponent;
