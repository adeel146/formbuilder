import { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ISection, ISectionRow } from "components/states/global.state";
import SingleTableColumn from "./SingleTableColumn";

interface ISectionTable extends Pick<ISection, "id"> {
  row: ISectionRow;
}

const SectionTable: FC<ISectionTable> = ({ id: sectionId, row }) => {
  const dragKey: (string | number)[] = [sectionId, row.id, "from_table"];
  return (
    <div className="px-8 my-4">
      <div className="flex-1 flex">
        <Droppable
          direction="horizontal"
          type="input"
          droppableId={dragKey.toString()}
        >
          {(provided) => (
            <div
              style={{
                flex: "1 1 auto",
                overflowX: "auto",
                overflowY: "hidden",
              }}
              className="w-0 flex flex-1 border-t border-r"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div>
                <div className="h-[40px] w-[50px] border-b border-l"></div>
                <div className="h-[40px] w-[50px] border-l border-b flex justify-center items-center font-medium">
                  1
                </div>
                <div className="h-[40px] w-[50px] border-l border-b flex justify-center items-center font-medium">
                  2
                </div>
                <div className="h-[40px] w-[50px] border-l border-b flex justify-center items-center font-medium">
                  3
                </div>
              </div>
              <div key={row?.id} className="border-l-0 flex">
                {row?.children?.filter(Boolean).map((child, index) => {
                  const tempArr = [...dragKey];
                  tempArr.splice(2, 0, index);
                  const childDragKey = tempArr.toString();
                  return (
                    <Draggable
                      key={`tableColumnDraggable,${childDragKey}`}
                      index={index}
                      draggableId={`tableColumnDraggable,${childDragKey}`}
                    >
                      {(providedDraggable) => (
                        <div
                          className="flex"
                          ref={providedDraggable.innerRef}
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                        >
                          {child && (
                            <SingleTableColumn
                              index={index}
                              rowType={row.type}
                              rowId={row.id}
                              {...child}
                              sectionId={sectionId}
                              key={`tableColumnDraggable,${childDragKey}`}
                            />
                          )}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>

              <div className="flex-1">
                <div className="h-[40px] border-l border-b"></div>
                <div className="h-[40px] border-l border-b"></div>
                <div className="h-[40px] border-l border-b"></div>
                <div className="h-[40px] border-l border-b"></div>
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default SectionTable;
