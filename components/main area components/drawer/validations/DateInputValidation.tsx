import { DatePicker } from "antd";
import { FC } from "react";
import moment from "moment";
import { IInputValidation } from "./TextInputValidation";

const DateInputValidation: FC<IInputValidation> = ({
  value,
  setValue,
  hasError,
  onBlur,
}) => {
  return (
    <>
      <DatePicker
        onBlur={onBlur}
        style={hasError ? { border: "1px solid #DF4440" } : {}}
        className="w-full"
        placeholder="YYYY-MM-DD"
        value={value ? moment(value) : undefined}
        onChange={(date) => setValue(date?.toDate())}
      />
    </>
  );
};

export default DateInputValidation;
