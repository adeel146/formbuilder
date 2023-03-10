import {
  ChevronLeftIcon,
  DrawerDeleteIcon,
  DrawerSettingsIcon,
  DrawerValidationIcon,
  ErrorIcon,
} from "components/icons.list";
import { FC } from "react";
import styled, { css } from "styled-components";

interface IICon {
  onClick?: () => void;
  active?: boolean;
  hasError?: boolean;
}

export const CloseIcon: FC<IICon> = ({ onClick }) => (
  <IconWrapper onClick={onClick}>
    <ChevronLeftIcon />
  </IconWrapper>
);

export const SettingIcon: FC<IICon> = ({ active, onClick, hasError }) => (
  <RightIconWrapper onClick={onClick} className="flex-col" active={active}>
    <div className="relative">
      <DrawerSettingsIcon />
      {hasError && (
        <AbsoluteSpan className="absolute top-0 right-0">
          <ErrorIcon />
        </AbsoluteSpan>
      )}
    </div>

    <p>Settings</p>
  </RightIconWrapper>
);

export const ValidationIcon: FC<IICon> = ({ active, onClick, hasError }) => (
  <RightIconWrapper onClick={onClick} className="flex-col" active={active}>
    <div className="relative">
      <DrawerValidationIcon />
      {hasError && (
        <AbsoluteSpan className="absolute top-0 right-0">
          <ErrorIcon />
        </AbsoluteSpan>
      )}
    </div>

    <p>Validation</p>
  </RightIconWrapper>
);

export const DeleteIcon: FC<IICon> = ({ onClick }) => (
  <RightIconWrapper onClick={onClick} className="flex-col">
    <DrawerDeleteIcon />
    <p>Delete</p>
  </RightIconWrapper>
);

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

const RightIconWrapper = styled.div<{ disabled?: boolean; active?: boolean }>`
  padding: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.4s;

  & svg {
    fill: ${(props) => props.theme.icon_dark_grey};
  }

  p {
    font-size: 10px;
    padding: 0;
    margin: 0;
    margin-top: 4px;
    font-weight: 500;
  }

  ${(props) =>
    props.disabled
      ? ``
      : css`
          &:hover {
            cursor: pointer;
            & svg {
              fill: ${(props) => props.theme.primary};
            }

            p {
              color: ${(props) => props.theme.primary};
            }
          }
        `}
  ${(props) =>
    props.active
      ? css`
          background-color: ${(props) => props.theme.primary_200};
          & svg {
            fill: ${(props) => props.theme.primary};
          }

          p {
            color: ${(props) => props.theme.primary};
          }
        `
      : ``}
`;

const AbsoluteSpan = styled.span`
  position: absolute;
  top: -7px;
  right: -7px;
`;
