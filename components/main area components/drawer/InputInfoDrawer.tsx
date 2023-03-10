import React, { FC, useState } from "react";
import {
  CloseIcon,
  DeleteIcon,
  SettingIcon,
  ValidationIcon,
} from "./DrawerIcon";
import styled from "styled-components";
import OptionRenderer from "./OptionRenderer";
import ValidationRenderer from "./validations/ValidationRenderer";
import { useSections } from "components/states/global.state";
import { find } from "lodash";
import useErrors from "hooks/useError";
import useValidationErrors from "hooks/useValidationErrors";

interface PropTypes {
  open: boolean;
  onClose: () => void;
}

const InputInfoDrawer: FC<PropTypes> = ({ open, onClose }) => {
  const {
    selectedColumnForOptionDialog,
    sections,
    setValueForSelectedColumnForOptionDialog,
    deleteRowColumn,
  } = useSections();

  const [sectionId, rowId, index] = selectedColumnForOptionDialog.split(",");
  const section = find(sections, { id: sectionId });
  const row = find(section?.rows, { id: rowId });
  const currentChild = row?.children[+index];

  const { hasError: optionError } = useErrors(currentChild?.id);
  const { hasError: validationError } = useValidationErrors(currentChild?.id);

  const setOptionSelected = (keyName: string) => {
    const arr = selectedColumnForOptionDialog.split(",");
    arr.splice(3, 1, keyName);
    setValueForSelectedColumnForOptionDialog(arr.toString());
  };

  if (!open) {
    return <></>;
  }

  return (
    <MainDrawer className={`${!open && "hidden"}`}>
      <div className="px-3 py-3 w-full border-b border-grey-400 flex items-center">
        <CloseIcon onClick={onClose} />
        <p className="text-base text-gray-600 mb-0 font-bold">
          Field Properties
        </p>
      </div>
      <div className="w-full flex-1 flex">
        <div className="flex flex-1 flex-col relative">
          <div
            style={{ flex: "1 1 auto" }}
            className="h-0 overflow-auto py-5 px-3 "
          >
            {selectedColumnForOptionDialog.includes("settings") && (
              <OptionRenderer />
            )}
            {selectedColumnForOptionDialog.includes("validations") && (
              <ValidationRenderer />
            )}
          </div>
        </div>
        <div className="w-[80px] flex flex-col justify-between border-l border-grey-400 flex-grow-0">
          <div className="w-full flex flex-col">
            <SettingIcon
              hasError={optionError}
              active={selectedColumnForOptionDialog.includes("settings")}
              onClick={() => setOptionSelected("settings")}
            />
            <ValidationIcon
              hasError={validationError}
              active={selectedColumnForOptionDialog.includes("validations")}
              onClick={() => setOptionSelected("validations")}
            />
          </div>
          <div className="border-t border-grey-400">
            <DeleteIcon
              onClick={() => deleteRowColumn(sectionId, rowId, index)}
            />
          </div>
        </div>
      </div>
    </MainDrawer>
  );
};

export default InputInfoDrawer;

const MainDrawer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
`;
