import { ISection, RowTypeEnum } from "components/states/global.state";
import { FC, ElementType } from "react";
import DefaultRowWrapper from "./DefaultRowWrapper";
import MutualRowType from "./MutualRowType";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface IRows extends Pick<ISection, "id" | "rows"> {}

const Rows: FC<IRows> = ({ id: sectionId, rows }) => {
  return (
    <Droppable droppableId={sectionId}>
      {(provided, context) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {rows.map((row, index) => {
            const RowType = rowTypes.find((rt) => rt.type === row.type)
              ?.component as ElementType;

            return (
              <div key={row.id}>
                <Draggable draggableId={row.id} index={index}>
                  {(providedDraggable, contextDraggable) => (
                    <DefaultRowWrapper
                      columnDragOver={context.isDraggingOver}
                      {...contextDraggable}
                      {...providedDraggable}
                      {...row}
                      sectionId={sectionId}
                    >
                      <RowType
                        {...contextDraggable}
                        sectionId={sectionId}
                        {...row}
                      />
                    </DefaultRowWrapper>
                  )}
                </Draggable>
              </div>
            );
          })}
          {rows.length === 0 && <div className="py-2" />}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Rows;

interface IRowTypes {
  type: RowTypeEnum;
  component: ElementType;
}

const rowTypes: IRowTypes[] = [
  {
    type: "single",
    component: MutualRowType,
  },
  {
    type: "double",
    component: MutualRowType,
  },
  {
    type: "triple",
    component: MutualRowType,
  },
];
