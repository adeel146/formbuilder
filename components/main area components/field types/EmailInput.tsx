import { Input } from "antd";
import { EmailInputIcon } from "components/icons.list";
import { FC } from "react";

const EmailInput: FC = () => {
  return <Input addonAfter={<EmailInputIcon />} />;
};

export default EmailInput;
