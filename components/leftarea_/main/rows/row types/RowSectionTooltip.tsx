import { DeleteOutlined } from "@ant-design/icons";
import {
  DrawerSettingsIcon,
  DrawerValidationIcon,
  ErrorIcon,
} from "components/icons.list";
import { useSections } from "components/states/global.state";
import { FC } from "react";
import styled, { css } from "styled-components";

interface IRowSectionTooltip {
  dragKey: string;
  optionError: boolean;
  validationError: boolean;
}

const RowSectionTooltip: FC<IRowSectionTooltip> = ({
  dragKey,
  optionError,
  validationError,
}) => {
  const {
    deleteRowColumn,
    selectedColumnForOptionDialog,
    setValueForSelectedColumnForOptionDialog,
  } = useSections();
  const [sectionId, rowId, columnIndex] = dragKey.split(",");

  return (
    <MainWrapper
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex items-center">
        <IconWrapper
          onClick={() =>
            setValueForSelectedColumnForOptionDialog(dragKey + ",settings")
          }
          selected={dragKey + ",settings" === selectedColumnForOptionDialog}
        >
          {optionError && (
            <span className="absolute top-0 right-0">
              <ErrorIcon />
            </span>
          )}
          <DrawerSettingsIcon />
        </IconWrapper>
        <IconWrapper
          onClick={() =>
            setValueForSelectedColumnForOptionDialog(dragKey + ",validations")
          }
          selected={dragKey + ",validations" === selectedColumnForOptionDialog}
        >
          <DrawerValidationIcon />
          {validationError && (
            <span className="absolute top-0 right-0">
              <ErrorIcon />
            </span>
          )}
        </IconWrapper>
      </div>
      <div className="flex items-center ml-1">
        <DeleteIcon
          onClick={() => {
            deleteRowColumn(sectionId, rowId, columnIndex);
          }}
        />
      </div>
    </MainWrapper>
  );
};

export default RowSectionTooltip;

const MainWrapper = styled.div`
  margin: -8px -8px;
  flex: 1;
  display: flex;
  align-items: center;
`;

const DeleteIcon = styled(DeleteOutlined)`
  font-size: 20px;
  color: ${(props) => props.theme.icon_dark_grey};
  transition: all 0.5s;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

const IconWrapper = styled.div<{ selected: boolean }>`
  padding: 4px;
  cursor: pointer;
  border-radius: 50%;
  position: relative;

  ${(props) =>
    props.selected
      ? css`
          background-color: ${props.theme.primary_200};
        `
      : ""}

  svg {
    transform: scale(0.8);
    fill: ${(props) => props.theme.icon_dark_grey};
    transition: fill 0.4s;

    ${(props) =>
      props.selected
        ? css`
            fill: ${props.theme.primary};
          `
        : ""}

    :hover {
      fill: ${(props) => props.theme.primary};
    }
  }
`;
