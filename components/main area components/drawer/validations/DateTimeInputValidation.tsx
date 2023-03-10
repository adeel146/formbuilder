import { DatePicker } from "antd";
import { FC } from "react";
import moment from "moment";
import { IInputValidation } from "./TextInputValidation";

const DateTimeInputValidation: FC<IInputValidation> = ({
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

export default DateTimeInputValidation;
