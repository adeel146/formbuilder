import { InputHandleIcon } from "components/icons.list";
import { FC } from "react";
import styled, { css } from "styled-components";
import inputFieldsList from "./inputFieldsList";
import { Draggable, Droppable } from "react-beautiful-dnd";

const MainRightArea: FC = () => {
  return (
    <Droppable type="input" isDropDisabled={true} droppableId="right-area">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="p-4"
        >
          {inputFieldsList.map((field, index) => (
            <div key={index}>
              <Draggable index={index} draggableId={field.id}>
                {(provided, context) => (
                  <SingleInputCardWrapper
                    isDragging={context.isDragging}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="pl-3 rounded-sm mb-4 flex border cursor-pointer"
                  >
                    <div className="flex-1 py-3 flex items-center">
                      <div className="field_icon">
                        <field.icon />
                      </div>
                      <div className="ml-2 font-semibold">{field.name}</div>
                    </div>
                    <div className="flex items-center px-2">
                      <InputHandleIcon />
                    </div>
                  </SingleInputCardWrapper>
                )}
              </Draggable>
            </div>
          ))}
        </div>
      )}
    </Droppable>
  );
};

export default MainRightArea;

const hoverStyle = css`
  border-color: ${(props) => props.theme.primary};
  .field_icon svg {
    fill: ${(props) => props.theme.primary};
  }
  color: ${(props) => props.theme.primary};
`;

const SingleInputCardWrapper = styled.div<{ isDragging: boolean }>`
  background-color: white;
  &:hover {
    ${hoverStyle};
  }

  ${(props) =>
    props.isDragging &&
    css`
      ${hoverStyle}
      opacity: 0.8;
    `}

  & svg {
    fill: lightslategray;
  }

  .field_icon svg {
    fill: rgba(0, 0, 0, 0.6);
  }
`;
