import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { IRowChildren } from "components/states/global.state";
import { FC } from "react";

interface IDefaultInputWrapper extends Pick<IRowChildren, "options"> {
  hideNameAndHelpText: boolean;
}

const DefaultInputWrapper: FC<IDefaultInputWrapper> = ({
  children,
  options,
  hideNameAndHelpText,
}) => {
  return (
    <div>
      <div
        className={`flex items-center my-1 ${hideNameAndHelpText && "hidden"} `}
      >
        <div className="text-icon_dark_grey text-xs font-medium">
          {options["required"] && <span className="text-red-600">*</span>}
          {options["name"]}
        </div>
        {options["help_text"] && (
          <Tooltip
            placement="top"
            className="cursor-help"
            title={options["help_text"]}
          >
            <InfoCircleOutlined className="text-xs ml-1" />
          </Tooltip>
        )}
      </div>
      {children}
    </div>
  );
};

export default DefaultInputWrapper;
