import inputFieldsList from "components/main area components/inputFieldsList";
import { IRowChildren } from "components/states/global.state";
import { FC } from "react";
import styled from "styled-components";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

interface IColumnInputRenderer extends Pick<IRowChildren, "type" | "options"> {}

const ColumnInputRenderer: FC<IColumnInputRenderer> = ({ type, options }) => {
  const CurrentInput = inputFieldsList.find((ifl) => ifl.id === type) as any;

  return (
    <Wrapper
      className="h-[40px] border border-r-transparent border-t-transparent px-4 flex justify-center items-center font-medium"
      style={{
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      <CurrentInput.icon />
      <div className="ml-3">{options["name"]}</div>
      {options["help_text"] && (
        <Tooltip
          placement="top"
          className="cursor-help"
          title={options["help_text"]}
        >
          <InfoCircleOutlined className="text-sm ml-2" />
        </Tooltip>
      )}
    </Wrapper>
  );
};

export default ColumnInputRenderer;

const Wrapper = styled.div`
  svg {
    transform: scale(0.8);
  }
`;
