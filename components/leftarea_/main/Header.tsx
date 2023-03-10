import {
  SectionDeleteIcon,
  SectionDuplicateIcon,
  SectionMoveDownIcon,
  SectionMoveUpIcon,
  SectionSettingsIcon,
} from "components/icons.list";
import { ISection, useSections } from "components/states/global.state";
import { FC } from "react";
import styled, { css } from "styled-components";
import { Tooltip } from "antd";
const HtmlToReactParser = require("html-to-react").Parser;

interface IHeader extends Pick<ISection, "name" | "id" | "description"> {}
interface IIcon extends Pick<IHeader, "id"> {}

const htmlToReactParser = new HtmlToReactParser();

const Header: FC<IHeader> = ({ name, id, description }) => {
  const { setValueForSelectedSectionForOptionDialog } = useSections();

  return (
    <div className="px-6 pl-8">
      <div className="flex items-center">
        <SectionNameWrapper
          onClick={() => setValueForSelectedSectionForOptionDialog(id)}
          className="w-full"
        >
          <HTMLRendererWrapper>
            {htmlToReactParser.parse(name)}
          </HTMLRendererWrapper>
        </SectionNameWrapper>
        <div>
          <div className="flex">
            {iconList.map((Icon, index) => (
              <div className="mr-2" key={index}>
                <Icon id={id} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <SectionDescriptionWrapper
          onClick={() => setValueForSelectedSectionForOptionDialog(id)}
          className="w-full"
        >
          <HTMLRendererWrapper>
            {htmlToReactParser.parse(description)}
          </HTMLRendererWrapper>
        </SectionDescriptionWrapper>
      </div>
    </div>
  );
};

export default Header;

const IconWrapper = styled.div<{ disabled?: boolean }>`
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: background-color 0.4s;

  & svg {
    fill: ${(props) =>
      props.disabled ? props.theme.primary_200 : props.theme.icon_dark_grey};
  }

  ${(props) =>
    props.disabled
      ? ``
      : css`
          &:hover {
            cursor: pointer;
            background-color: ${(props) => props.theme.primary_200};
          }
        `}
`;

const SectionNameWrapper = styled.div`
  margin-right: 32px;
`;

const SectionDescriptionWrapper = styled.div`
  div {
    margin-right: 32px;
    color: ${(props) => props.theme.text_grey_1};
  }
`;

const HTMLRendererWrapper = styled.div`
  p {
    margin-bottom: 0px;
  }
`;

const DeleteIcon: FC<IIcon> = ({ id }) => {
  const { sections, deleteItem } = useSections();
  const disabled = sections.length === 1;
  return (
    <Tooltip placement="top" title="Delete Section">
      <IconWrapper
        disabled={disabled}
        onClick={() => !disabled && deleteItem(id)}
      >
        <SectionDeleteIcon />
      </IconWrapper>
    </Tooltip>
  );
};

const DownIcon: FC<IIcon> = ({ id }) => {
  const { sections, moveItem } = useSections();
  const index = sections.findIndex((s) => s.id === id);
  const disabled = sections.length - 1 === index;
  return (
    <Tooltip placement="top" title="Move Section Down">
      <IconWrapper
        onClick={() => !disabled && moveItem(index, index + 1)}
        disabled={disabled}
      >
        <SectionMoveDownIcon />
      </IconWrapper>
    </Tooltip>
  );
};

const UpIcon: FC<IIcon> = ({ id }) => {
  const { sections, moveItem } = useSections();
  const index = sections.findIndex((s) => s.id === id);
  const disabled = index === 0;
  return (
    <Tooltip placement="top" title="Move Section Up">
      <IconWrapper
        onClick={() => !disabled && moveItem(index, index - 1)}
        disabled={disabled}
      >
        <SectionMoveUpIcon />
      </IconWrapper>
    </Tooltip>
  );
};

const DuplicateIcon: FC<IIcon> = ({ id }) => {
  const { duplicateSection } = useSections();
  return (
    <Tooltip placement="top" title="Duplicate Section">
      <IconWrapper onClick={() => duplicateSection(id)}>
        <SectionDuplicateIcon />
      </IconWrapper>
    </Tooltip>
  );
};

const SettingsIcon: FC<IIcon> = ({ id }) => {
  const { setValueForSelectedSectionForOptionDialog } = useSections();

  return (
    <Tooltip placement="top" title="Section Settings">
      <IconWrapper
        onClick={() => setValueForSelectedSectionForOptionDialog(id)}
      >
        <SectionSettingsIcon />
      </IconWrapper>
    </Tooltip>
  );
};

const iconList = [SettingsIcon, DuplicateIcon, UpIcon, DownIcon, DeleteIcon];
