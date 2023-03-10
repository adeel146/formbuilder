import { Checkbox } from "antd";
import axios from "axios";
import { FC } from "react";
import { useQuery } from "react-query";
import { useEffectOnce } from "react-use";

interface ICheckboxDefaultValue {
  value: any;
  setValue: (str: any) => any;
  getOtherFieldValue: (str: string) => any;
}

interface MainList {
  id: number;
  text: string;
}

const CheckboxDefaultValue: FC<ICheckboxDefaultValue> = ({
  value,
  setValue,
  getOtherFieldValue,
}) => {
  const selectedOption = getOtherFieldValue("list");

  const { data: options = [] } = useQuery(
    ["list_options", selectedOption],
    () => axios.get(`/list_option/${value}`),
    {
      select: (res) => {
        return res.data.data;
      },
      enabled: !!selectedOption,
    }
  );

  useEffectOnce(() => {
    setValue(value ? value : []);
  });

  const onChangeCheckbox = (newValue: number) => {
    if (value?.includes(newValue)) {
      const tempArr = value?.filter((v: any) => v !== newValue);
      setValue(tempArr);
    } else {
      setValue([...value, newValue]);
    }
  };

  return (
    <>
      {options?.map((val: MainList) => (
        <div key={val.id} className="w-full pl-1 mb-1">
          <Checkbox
            checked={value?.includes(val.id)}
            onChange={() => onChangeCheckbox(val.id)}
          >
            {val.text}
          </Checkbox>
        </div>
      ))}
    </>
  );
};

export default CheckboxDefaultValue;
