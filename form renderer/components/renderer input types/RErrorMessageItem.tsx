import { Children, FC } from "react";
import { get } from "lodash";
import styled from "styled-components";
import { Form } from "antd";

interface IRErrorMessageItem {
  errors: {
    [x: string]: any;
  };
  name: string;
  invalid: boolean;
}

const RErrorMessageItem: FC<IRErrorMessageItem> = ({
  invalid,
  errors,
  name,
  children,
}) => {
  return (
    <ErrorFormInput
      className="!mb-0"
      validateStatus={invalid ? "error" : undefined}
      help={get(errors, name)?.message ? get(errors, name)?.message : undefined}
    >
      {children}
    </ErrorFormInput>
  );
};

export default RErrorMessageItem;

const ErrorFormInput = styled(Form.Item)`
  .ant-form-item-explain-error {
    font-size: 11px;
    margin-top: 2px;
  }
  .ant-form-item-explain {
    min-height: auto;
  }
`;
