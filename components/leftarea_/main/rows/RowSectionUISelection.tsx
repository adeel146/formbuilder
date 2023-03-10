import {
  defaultRowsBlueprint,
  ISectionRow,
  useSections,
} from "components/states/global.state";
import { FC } from "react";
import styled, { css } from "styled-components";

interface IRowSectionUISelection extends Omit<ISectionRow, "children"> {
  sectionId: string;
}

const RowSectionUISelection: FC<IRowSectionUISelection> = ({
  type,
  sectionId,
  id,
}) => {
  const { changeRowColumns } = useSections();

  return (
    <div className="flex">
      {defaultRowsBlueprint.map((d) => (
        <MainWrapperWidth
          onClick={() =>
            type !== d.type && changeRowColumns(sectionId, id, d.type)
          }
          key={d.type}
          selected={type === d.type}
          className="gap-1"
        >
          {d.children.map((v, index) => (
            <SingleBlock key={index} />
          ))}
        </MainWrapperWidth>
      ))}
    </div>
  );
};

const MainWrapperWidth = styled.div<{ selected: boolean }>`
  width: 80px;
  height: 32px;
  margin: 0px 4px;
  display: flex;
  cursor: pointer;

  ${(props) =>
    props.selected &&
    css`
      border: 2px solid ${(props) => props.theme.icon_light_grey};
      border-radius: 6px;
    `}
`;
const SingleBlock = styled.div`
  background-color: ${(props) => props.theme.primary};
  flex: 1;
  border-radius: 4px;
`;

export default RowSectionUISelection;
