import { RowHandleIcon } from "components/icons.list";
import { FC, useState } from "react";
import styled, { css } from "styled-components";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { ISectionRow, useSections } from "components/states/global.state";
import { BoxPlotOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import RowSectionUISelection from "./RowSectionUISelection";

interface IRowWrapper
  extends DraggableProvided,
    DraggableStateSnapshot,
    Omit<ISectionRow, "children"> {
  sectionId: string;
  columnDragOver: boolean;
}

const DefaultRowWrapper: FC<IRowWrapper> = ({
  children,
  innerRef,
  draggableProps,
  dragHandleProps,
  isDragging,
  columnDragOver,
  type,
  sectionId,
  id: rowId,
}) => {
  const { disableLeftHoverAndDrop } = useSections();
  const [popupVisible, setPopupVisible] = useState(false);
  return (
    <Wrapper
      showForcedHover={popupVisible}
      isDragging={isDragging}
      columnDragOver={columnDragOver || disableLeftHoverAndDrop}
      ref={innerRef}
      {...draggableProps}
      className="px-6 relative bg-white py-1"
    >
      <div
        {...dragHandleProps}
        className="absolute left-0 top-0 bottom-0 bg-bg_grey_3 w-4 flex items-center handle-row-bar "
      >
        <RowHandleIcon />
      </div>
      <Popover
        onVisibleChange={(visible) => setPopupVisible(visible)}
        content={() => (
          <RowSectionUISelection sectionId={sectionId} type={type} id={rowId} />
        )}
        trigger="hover"
      >
        <div className="absolute right-1 top-0 cursor-pointer handle-row-bar">
          <BoxPlotOutlined className="text-lg !text-primary" />
        </div>
      </Popover>
      {children}
    </Wrapper>
  );
};
export default DefaultRowWrapper;

const hoverCssStyles = css`
  background: ${(props) => props.theme.primary_200};
  transition: all 0.8s;
  .handle-row-bar {
    opacity: 1;
  }
  .input-placeholders {
    opacity: 1;
  }
`;

const Wrapper = styled.div<{
  isDragging?: boolean;
  columnDragOver: boolean;
  showForcedHover: boolean;
}>`
  .handle-row-bar {
    opacity: 0;
  }

  ${(props) =>
    props.isDragging &&
    css`
      ${hoverCssStyles};
      opacity: 0.5;
    `};

  ${(props) =>
    props.showForcedHover &&
    css`
      ${hoverCssStyles};
    `};

  &:hover {
    ${(props) => !props.columnDragOver && hoverCssStyles};
  }
`;
