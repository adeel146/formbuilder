import { DatePicker } from "antd";
import { FC } from "react";
import moment from "moment";

interface IDefaultValueDateTimeComponent {
  value: any;
  setValue: (str: any) => any;
}

const DefaultValueDateTimeComponent: FC<IDefaultValueDateTimeComponent> = ({
  value,
  setValue,
}) => {
  return (
    <>
      <DatePicker
        showTime={{ format: "hh:mm A" }}
        className="w-full"
        format="YYYY-MM-DD hh:mm A"
        placeholder="YYYY-MM-DD HH:MM"
        value={value ? moment(value) : undefined}
        onChange={(date) => setValue(date?.toDate())}
      />
    </>
  );
};

export default DefaultValueDateTimeComponent;
