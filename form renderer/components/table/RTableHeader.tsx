import inputFieldsList from "components/main area components/inputFieldsList";
import { IRowChildren } from "components/states/global.state";
import { FC } from "react";
import styled from "styled-components";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

interface IRTableHeader extends Pick<IRowChildren, "type" | "options"> {}

const RTableHeader: FC<IRTableHeader> = ({ type, options }) => {
  const CurrentInput = inputFieldsList.find((ifl) => ifl.id === type) as any;

  return (
    <Wrapper
      className="h-[40px] px-4 flex justify-center items-center font-medium"
      style={{
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      <CurrentInput.icon />

      <div className="ml-3">{options["name"]}</div>
      {options["required"] && <span className="text-red-600">*</span>}
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

export default RTableHeader;

const Wrapper = styled.div`
  svg {
    transform: scale(0.8);
  }
`;
