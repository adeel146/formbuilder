import styled from "styled-components";
import { FC } from "react";
import { IInputOptionsList } from "../InputOptionsList";

interface IMainOptionsWrapper extends Omit<IInputOptionsList, "component"> {}

const MainOptionsWrapper: FC<IMainOptionsWrapper> = ({
  isRequired,
  label,
  children,
}) => {
  return (
    <div className="mb-5">
      <Title>
        {label}
        {isRequired && <span className="ml-1 text-red-500">*</span>}{" "}
      </Title>
      {children}
    </div>
  );
};

export default MainOptionsWrapper;

const Title = styled.p<{ disabled?: boolean }>`
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => (props.disabled ? "#c4c5c8" : "#61656c")};
  margin-bottom: 5px;
`;
