import { FC, useMemo, useRef } from "react";
import JoditEditor from "jodit-react";

interface IEditorSection {
  value: string;
  onChange: (val: string) => void;
  title: string;
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

const EditorSectionInput: FC<IEditorSection> = ({ value, onChange, title }) => {
  const editor = useRef<JoditEditor | null>(null);

  const config = useMemo(
    () => ({
      statusbar: false,
      buttons,
      buttonsMD: buttons,
      buttonsXS: buttons,
    }),
    []
  );

  return (
    <div>
      <div className="mb-1 font-bold">{title}</div>
      <JoditEditor
        onChange={(content) => onChange(content)}
        value={value}
        ref={editor}
        config={config}
        onBlur={() => {
          // if (value === "" && title === "Name") {
          //   onChange("United section");
          // } else if (value === "" && title === "Description") {
          //   onChange("Enter your section description");
          // }
        }}
      />
    </div>
  );
};

export default EditorSectionInput;
