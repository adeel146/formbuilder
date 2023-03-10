import { Popover } from "antd";
import {
  IRowChildren,
  RowTypeEnum,
  useSections,
} from "components/states/global.state";
import useErrors from "hooks/useError";
import useValidationErrors from "hooks/useValidationErrors";
import { FC } from "react";
import styled, { css } from "styled-components";
import RowSectionTooltip from "../rows/row types/RowSectionTooltip";
import ColumnInputRenderer from "./ColumnInputRenderer";

interface ISingleTableColumn extends IRowChildren {
  sectionId: string;
  rowType: RowTypeEnum;
  rowId: string;
  index: number;
}

const SingleTableColumn: FC<ISingleTableColumn> = ({
  type,
  options,
  rowId,
  sectionId,
  index,
  id,
}) => {
  const {
    selectedColumnForOptionDialog,
    setValueForSelectedColumnForOptionDialog,
  } = useSections();
  const dragKey = [sectionId, rowId, index].toString();
  const { hasError: optionError } = useErrors(id);
  const { hasError: validationError } = useValidationErrors(id);
  return (
    <Popover
      trigger="hover"
      overlayInnerStyle={{
        borderRadius: 100,
      }}
      content={() => (
        <RowSectionTooltip
          optionError={optionError}
          validationError={validationError}
          dragKey={dragKey}
        />
      )}
    >
      <Wrapper
        onClick={() =>
          setValueForSelectedColumnForOptionDialog(dragKey + ",settings")
        }
        selected={selectedColumnForOptionDialog.includes(dragKey)}
        className="cursor-pointer bg-white"
        hasError={optionError || validationError}
      >
        <ColumnInputRenderer options={options} type={type} />
        <div className="h-[40px] border-l border-b"></div>
        <div className="h-[40px] border-l border-b"></div>
        <div className="h-[40px] border-l border-b"></div>
      </Wrapper>
    </Popover>
  );
};

export default SingleTableColumn;

const hoverStyles = css`
  cursor: pointer;
  background-color: #9eb3f718;
  div:first-child {
    border-style: dashed;
    border-color: ${(props) => props.theme.primary};
  }
`;

const Wrapper = styled.div<{ selected: boolean; hasError: boolean }>`
  min-width: 200px;

  ${(props) => props.selected && hoverStyles};
  ${(props) =>
    props.hasError &&
    css`
      div:first-child {
        background-color: rgb(254 226 226);
      }
    `};

  :hover {
    ${hoverStyles};
  }
`;
