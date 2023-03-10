import React, { FC } from "react";
import { CloseIcon } from "./DrawerIcon";
import styled from "styled-components";
import { useSections } from "components/states/global.state";
import EditorSectionInput from "./section inputs/EditorSectionInput";

interface PropTypes {
  open: boolean;
  onClose: () => void;
}

const SectionInfoDrawer: FC<PropTypes> = ({ open, onClose }) => {
  const {
    selectedSectionForOptionDialog,
    sections,
    onChangeName,
    onChangeDescription,
  } = useSections();

  const foundSection = sections.find(
    (section) => section.id === selectedSectionForOptionDialog
  );

  if (!open) {
    return <></>;
  }

  return (
    <MainDrawer className={`${!open && "hidden"}`}>
      <div className="px-3 py-3 w-full border-b border-grey-400 flex items-center">
        <CloseIcon onClick={onClose} />
        <p className="text-base text-gray-600 mb-0 font-bold">
          Section settings
        </p>
      </div>
      <div className="w-full flex-1 flex">
        <div className="flex flex-1 flex-col relative">
          <div
            style={{ flex: "1 1 auto" }}
            className="h-0 overflow-auto py-5 px-3 space-y-4"
          >
            <EditorSectionInput
              title="Name"
              value={foundSection?.name ?? ""}
              onChange={(val) =>
                onChangeName(selectedSectionForOptionDialog, val)
              }
            />

            <EditorSectionInput
              title="Description"
              value={foundSection?.description ?? ""}
              onChange={(val) =>
                onChangeDescription(selectedSectionForOptionDialog, val)
              }
            />
          </div>
        </div>
      </div>
    </MainDrawer>
  );
};

export default SectionInfoDrawer;

const MainDrawer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
`;
