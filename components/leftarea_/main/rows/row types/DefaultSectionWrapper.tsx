import { ErrorIcon } from "components/icons.list";
import { IRowChildren } from "components/states/global.state";
import { FC } from "react";

interface IDefaultSectionWrapper extends Pick<IRowChildren, "options"> {
  hasError: boolean;
  hideNameAndHelpText: boolean;
}

const DefaultSectionWrapper: FC<IDefaultSectionWrapper> = ({
  children,
  options,
  hasError,
  hideNameAndHelpText,
}) => {
  return (
    <div>
      <div
        className={`text-icon_dark_grey text-xs font-medium my-1 flex items-center ${
          hideNameAndHelpText && "hidden"
        } `}
      >
        {hasError && (
          <span className="mr-1">
            <ErrorIcon size="lg" />
          </span>
        )}

        {options["name"]}
      </div>
      {children}
      {options["help_text"] && (
        <div
          className={`text-text_grey_2 text-[10px] font-medium my-1 ${
            hideNameAndHelpText && "hidden"
          }`}
        >
          {options["help_text"]}
        </div>
      )}
    </div>
  );
};

export default DefaultSectionWrapper;
