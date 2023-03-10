import { FC, useMemo, useRef } from "react";
import { ErrorText } from "./ListSelectTypeComponent";
import dynamic from "next/dynamic";

const JoditEditorRender = dynamic(() => import("jodit-react"), {
  ssr: false,
});

interface IInputOptionComponent {
  value: any;
  setValue: (str: any) => any;
  hasError: boolean;
  onBlur: (str: any) => any;
  disabled: boolean;
}

const buttons = [
  "bold",
  "italic",
  "underline",
  "link",
  "unlink",
  "fontsize",
  {
    group: "color",
    buttons: [],
  },
  "align",
];

const DefaultRichTextComponent: FC<IInputOptionComponent> = ({
  value,
  setValue,
  hasError,
  onBlur,
  disabled,
}) => {
  const editorRef = useRef<any>(null);

  const config = useMemo(
    () => ({
      statusbar: false,
      buttons,
      buttonsMD: buttons,
      buttonsXS: buttons,
      disabled,
    }),
    [disabled]
  );

  return (
    <>
      <JoditEditorRender
        onChange={(content) => setValue(content)}
        value={value ?? "Enter Your Text Here"}
        config={config}
        onBlur={() => {
          if (value === "") {
            setValue("Enter Your Text Here");
            onBlur("Enter Your Text Here");
            return;
          }
          onBlur(value);
        }}
        {...{ ref: editorRef }}
      />

      {hasError && <ErrorText>Please add value</ErrorText>}
    </>
  );
};

export default DefaultRichTextComponent;
