import { Select } from "antd";
import axios from "axios";
import { FC } from "react";
import { useQuery } from "react-query";

const { Option } = Select;

interface IListSelectDefaultComponent {
  value: any;
  setValue: (str: any) => any;
  getOtherFieldValue: (str: string) => any;
}

interface MainList {
  id: number;
  text: string;
}

const ListSelectDefaultComponent: FC<IListSelectDefaultComponent> = ({
  value,
  setValue,
  getOtherFieldValue,
}) => {
  const selectedOption = getOtherFieldValue("list");

  const { data: options = [] } = useQuery(
    ["list_options", selectedOption],
    () => axios.get(`/list_option/${selectedOption}`),
    {
      select: (res) => {
        return res.data.data;
      },
      enabled: !!selectedOption,
    }
  );

  return (
    <>
      <Select value={value} className="w-full" onChange={setValue}>
        {options?.map((val: MainList) => (
          <Option key={val.id} value={val.id}>
            {val.text}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default ListSelectDefaultComponent;
