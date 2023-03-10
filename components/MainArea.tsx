import { FC } from "react";
import MainLeftArea from "./main area components/MainLeftArea";
import MainRightArea from "./main area components/MainRightArea";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useSections } from "./states/global.state";
import InputInfoDrawer from "./main area components/drawer/InputInfoDrawer";
import SectionInfoDrawer from "./main area components/drawer/SectionInfoDrawer";

const MainArea: FC = () => {
  const {
    moveRows,
    toggleDisableHoverAndDrop,
    disableLeftHoverAndDrop,
    addInputsRows,
    addNewRowOnDrop,
    moveInputBetweenSections,
    moveInputToNewRow,
    selectedColumnForOptionDialog,
    setValueForSelectedColumnForOptionDialog,
    selectedSectionForOptionDialog,
    setValueForSelectedSectionForOptionDialog,
    sections,
    moveInputBetweenTableColumns,
    addInputsIntoTable,
  } = useSections();

  console.log("FORM JSON =>", sections);

  const onDragEnd = (result: DropResult) => {
    disableLeftHoverAndDrop && toggleDisableHoverAndDrop();
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === "right-area" &&
      source.droppableId === "right-area"
    )
      return;

    if (
      destination.droppableId.includes("from_table") ||
      source.droppableId.includes("from_table") ||
      draggableId.includes("from_table")
    ) {
      DragEndTableOperations(result);
      return;
    } else {
      onDragEndRowsOperations(result);
    }
  };

  const onDragEndRowsOperations = (result: DropResult) => {
    const { source, destination, type, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId.includes("new_row") &&
      draggableId.includes("fromSection")
    ) {
      // if drop a input on footer section droppable
      moveInputToNewRow(source, destination);
    } else if (draggableId.includes("fromSection")) {
      // if we drag input between draggable's
      moveInputBetweenSections(source, destination);
    } else if (destination.droppableId.includes("new_row")) {
      // if person drop on footer section create a new row
      addNewRowOnDrop(draggableId, destination);
      return;
    } else if (type === "input") {
      // from right side to the droppable
      addInputsRows(draggableId, destination);
      return;
    } else {
      // move rows ( drag and drop )
      moveRows(source, destination);
    }

    setValueForSelectedColumnForOptionDialog("");
    setValueForSelectedSectionForOptionDialog("");
  };
  const DragEndTableOperations = (result: DropResult) => {
    const { source, destination, type, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId.includes("new_row")) return;
    if (draggableId.includes("romSection")) return;

    if (
      draggableId.includes("tableColumnDraggable") &&
      !destination.droppableId.includes("new_row") &&
      destination.droppableId.includes("from_table")
    ) {
      moveInputBetweenTableColumns(source, destination);
    } else if (
      type === "input" &&
      destination.droppableId.includes("from_table")
    ) {
      addInputsIntoTable(draggableId, destination);
      return;
    }

    setValueForSelectedColumnForOptionDialog("");
    setValueForSelectedSectionForOptionDialog("");
  };

  const hideRightInputList: boolean = [
    !!selectedColumnForOptionDialog,
    !!selectedSectionForOptionDialog,
  ].includes(true);

  return (
    <DragDropContext
      onBeforeDragStart={(initial) => {
        if (initial.source.droppableId === "right-area") {
          toggleDisableHoverAndDrop();
        }
      }}
      onDragEnd={onDragEnd}
    >
      <div className="flex-1 flex">
        <div className="flex flex-1 flex-col">
          <div
            style={{ flex: "1 1 auto" }}
            className="h-0 overflow-y-auto overflow-x-hidden"
          >
            <MainLeftArea />
          </div>
        </div>
        <div className="max-w-sm ml-1 flex flex-1 flex-col border-l bg-white relative">
          <div
            style={{ flex: "1 1 auto" }}
            className={`h-0 overflow-auto ${hideRightInputList && "hidden"}`}
          >
            <MainRightArea />
          </div>
          <InputInfoDrawer
            open={!!selectedColumnForOptionDialog}
            onClose={() => {
              setValueForSelectedColumnForOptionDialog("");
            }}
          />
          <SectionInfoDrawer
            open={!!selectedSectionForOptionDialog}
            onClose={() => {
              setValueForSelectedSectionForOptionDialog("");
            }}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default MainArea;
