import inputFieldsList from "components/main area components/inputFieldsList";
import {
  IRowChildren,
  ISectionRow,
  useSections,
} from "components/states/global.state";
import React, { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled, { css } from "styled-components";
import WithoutDraggable from "./row types/WithoutDraggable";
import WithDraggable from "./row types/WithDraggabel";
import useErrors from "hooks/useError";
import useValidationErrors from "hooks/useValidationErrors";

export interface IRowType extends Omit<ISectionRow, "type"> {
  sectionId: string;
}

export interface ISingleChildType {
  child: IRowChildren | null;
  idx: number;
  sectionId: string;
  rowId: string;
}

const MutualRowType: FC<IRowType> = ({ children, sectionId, id: rowId }) => {
  return (
    <div className="flex justify-center gap-1">
      {children.map((child, index) => {
        return (
          <SingleChild
            key={index}
            child={child}
            idx={index}
            sectionId={sectionId}
            rowId={rowId}
          />
        );
      })}
    </div>
  );
};

const SingleChild: FC<ISingleChildType> = ({
  child,
  idx,
  sectionId,
  rowId,
}) => {
  const {
    selectedColumnForOptionDialog,
    setValueForSelectedColumnForOptionDialog,
  } = useSections();
  const { hasError: optionError } = useErrors(child?.id);
  const { hasError: validationError } = useValidationErrors(child?.id);

  const key = [sectionId, rowId, idx].toString();
  const {
    component: Component,
    inputProps,
    hideNameAndHelpText,
  } = (inputFieldsList.find((input) => input.id === child?.type) as any) ?? {};
  return (
    <Droppable
      isDropDisabled={!!Component}
      key={key}
      type="input"
      droppableId={key}
    >
      {(provided, context) => {
        return (
          <MainDroppableWrapper
            onClick={() =>
              setValueForSelectedColumnForOptionDialog(key + ",settings")
            }
            selected={selectedColumnForOptionDialog.includes(key)}
            isDraggingOver={context.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
            emptyArea={!Component}
            className={`w-full relative border border-transparent flex flex-col ${
              (optionError || validationError) && "bg-red-100"
            }`}
          >
            {!Component ? (
              <WithoutDraggable Component={Component} inputProps={inputProps} />
            ) : (
              <WithDraggable
                hideNameAndHelpText={!!hideNameAndHelpText}
                optionError={optionError}
                validationError={validationError}
                Component={Component}
                inputProps={inputProps}
                dragKey={key}
                index={idx}
                options={child?.options}
                validations={child?.validations as any[]}
              />
            )}
          </MainDroppableWrapper>
        );
      }}
    </Droppable>
  );
};

export default MutualRowType;

const MainDroppableWrapper = styled.div<{
  emptyArea: boolean;
  isDraggingOver: boolean;
  selected: boolean;
}>`
  &:hover {
    ${(props) =>
      !props.emptyArea &&
      !props.selected &&
      css`
        border: 1px dotted ${(props) => props.theme.primary};
      `}
  }

  border-radius: 4px;

  ${(props) =>
    props.selected &&
    !props.emptyArea &&
    css`
      background-color: ${props.theme.primary_200};
      border: 1px solid ${props.theme.primary};
    `};

  .input-placeholders {
    transition: all 0.3s;
    opacity: 0;
    border: 1px dashed ${(props) => props.theme.icon_light_grey};
    cursor: pointer;
    flex: 1;
    justify-content: center;
    align-items: center;
    display: flex;

    ${(props) =>
      props.isDraggingOver &&
      css`
        background: ${props.theme.primary_200};
        opacity: 1;
        border: 1px dashed ${props.theme.primary};
      `};

    svg {
      fill: ${(props) => props.theme.text_grey_1};
    }

    div {
      color: ${(props) => props.theme.text_grey_1};
      font-size: 12px;
    }
  }
`;
