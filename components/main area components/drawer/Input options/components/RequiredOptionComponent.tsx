import { Switch } from "antd";
import { FC } from "react";

interface IRequiredOptionComponent {
  value: any;
  setValue: (str: any) => any;
}

const RequiredOptionComponent: FC<IRequiredOptionComponent> = ({
  value,
  setValue,
}) => {
  return (
    <>
      <Switch
        size="small"
        checked={value}
        onChange={(checked) => setValue(checked)}
      />
    </>
  );
};

export default RequiredOptionComponent;
