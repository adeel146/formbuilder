import { Select } from "antd";
import axios from "axios";
import { useSections } from "components/states/global.state";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import SelectOptionsDialog from "./SelectOptionsDialog";

const { Option } = Select;

interface IListSelectTypeComponent {
  value: any;
  setValue: (str: any) => any;
  hasError: boolean;
  onBlur: (str: any) => any;
}

interface MainList {
  id: number;
  text: string;
}

const ListSelectTypeComponent: FC<IListSelectTypeComponent> = ({
  value,
  setValue,
  hasError,
  onBlur,
}) => {
  const [open, setOpen] = useState(false);
  const { data: list = [] } = useQuery(["all_list"], () => axios.get(`/list`), {
    select: (res) => {
      return res.data.data;
    },
  });

  return (
    <>
      <Select
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        value={value}
        style={hasError ? { border: "1px solid #DF4440" } : {}}
        className="w-full"
      >
        {list?.map((val: MainList) => (
          <Option key={val.id} value={val.id}>
            {val.text}
          </Option>
        ))}
      </Select>
      {hasError && <ErrorText>Please Select a list</ErrorText>}
      <SelectOptionsDialog
        value={value}
        setValue={setValue}
        open={open}
        onClose={() => {
          setOpen(false);
          onBlur(value);
        }}
      />
    </>
  );
};

export default ListSelectTypeComponent;

export const ErrorText = styled.span`
  color: ${(props) => props.theme.error_text ?? "#fff"};
  font-size: 11px;
  font-weight: 500;
`;
