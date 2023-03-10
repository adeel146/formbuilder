import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import InputPlaceHolder from "../InputPlaceHolder";
import { Popover } from "antd";
import RowSectionTooltip from "./RowSectionTooltip";
import DefaultSectionWrapper from "./DefaultSectionWrapper";
import { IRowChildren } from "components/states/global.state";

interface IWithDraggable extends Pick<IRowChildren, "options" | "validations"> {
  Component: any;
  inputProps: any;
  index: number;
  dragKey: string;
  optionError: boolean;
  validationError: boolean;
  hideNameAndHelpText: boolean;
}

const WithDraggable: FC<IWithDraggable> = ({
  Component,
  inputProps,
  index,
  dragKey,
  options,
  optionError,
  validationError,
  hideNameAndHelpText,
}) => {
  return (
    <Draggable
      isDragDisabled={!Component}
      index={index}
      draggableId={`fromSection,${dragKey}`}
    >
      {(dragProvided) => {
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
            <div
              ref={dragProvided.innerRef}
              {...dragProvided.draggableProps}
              {...dragProvided.dragHandleProps}
              className="h-full flex flex-1 flex-col"
            >
              {!!Component && (
                <div className="p-1">
                  <DefaultSectionWrapper
                    hideNameAndHelpText={hideNameAndHelpText}
                    options={options}
                    hasError={optionError || validationError}
                  >
                    <Component {...inputProps} options={options} />
                  </DefaultSectionWrapper>
                </div>
              )}

              {!Component && <InputPlaceHolder />}
              {!!Component && (
                <div className="absolute top-0 left-0 right-0 bottom-0" />
              )}
            </div>
          </Popover>
        );
      }}
    </Draggable>
  );
};

export default WithDraggable;
