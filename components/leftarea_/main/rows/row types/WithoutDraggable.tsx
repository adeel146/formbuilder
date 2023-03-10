import { FC } from "react";
import InputPlaceHolder from "../InputPlaceHolder";

interface IWithoutDraggable {
  Component: any;
  inputProps: any;
}

const WithoutDraggable: FC<IWithoutDraggable> = ({ Component, inputProps }) => {
  return (
    <div className="h-full flex flex-1 flex-col">
      {!!Component && (
        <div className="p-1">
          <Component {...inputProps} />
        </div>
      )}

      {!Component && <InputPlaceHolder />}
      {!!Component && (
        <div className="absolute top-0 left-0 right-0 bottom-0" />
      )}
    </div>
  );
};

export default WithoutDraggable;
