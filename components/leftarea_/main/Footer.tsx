import { SectionFooterIcon } from "components/icons.list";
import { SectionTypeEnum, useSections } from "components/states/global.state";
import { FC } from "react";
import styled, { css } from "styled-components";
import { Droppable } from "react-beautiful-dnd";

const Footer: FC<{ id: string; type: SectionTypeEnum }> = ({ id, type }) => {
  const { addItem, sections } = useSections();
  const index = sections.findIndex((s) => s.id === id);

  return (
    <div>
      {type === "rows" && (
        <div className="px-8 pl-8 mt-2">
          <Droppable type="input" droppableId={`new_row,${id}`}>
            {(provided, context) => {
              return (
                <DroppableArea
                  isDraggingOver={context.isDraggingOver}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="py-1"
                >
                  <div>
                    <SectionFooterIcon />
                  </div>
                  <div className="ml-1">Drag any field here</div>
                </DroppableArea>
              );
            }}
          </Droppable>
        </div>
      )}
      <div
        className={`flex items-center mt-3 ${
          sections.length - 1 === index && "mb-6"
        } `}
      >
        <div className="border flex-1" />
        <div
          onClick={() => addItem("rows")}
          className="mx-2 text-primary font-bold cursor-pointer"
        >
          Add Section
        </div>
        <div
          onClick={() => addItem("table")}
          className="mx-2 text-primary font-bold cursor-pointer"
        >
          Add Table
        </div>
        <div className="border flex-1" />
      </div>
    </div>
  );
};

export default Footer;

const hoverStyles = css`
  background-color: ${(props) => props.theme.primary_200};
  border: 1px dashed ${(props) => props.theme.primary};
`;

const DroppableArea = styled.div<{ isDraggingOver: boolean }>`
  border: 1px dashed ${(props) => props.theme.text_grey_1};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.text_grey_1};
  font-size: 12px;

  ${(props) => props.isDraggingOver && hoverStyles};

  svg {
    fill: ${(props) => props.theme.text_grey_1};
  }

  transition: background-color, 0.4s;
  cursor: pointer;

  &:hover {
    ${hoverStyles}
  }
`;
