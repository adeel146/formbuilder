import { Select } from "antd";
import { FC } from "react";

const { Option } = Select;

interface IListMultipleDefaultValue {
  value: any;
  setValue: (str: any) => any;
  getOtherFieldValue: (str: string) => any;
}

const AllowedFileTypes: FC<IListMultipleDefaultValue> = ({
  value,
  setValue,
}) => {
  return (
    <>
      <Select
        mode="multiple"
        value={value}
        className="w-full"
        onChange={setValue}
      >
        {mimeTypes?.map((val) => (
          <Option key={val.value} value={val.value}>
            {val.name}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default AllowedFileTypes;

const mimeTypes = [
  {
    name: "images",
    value: ".png, .jpg, .jpeg",
  },
  {
    name: "videos",
    value: ".mp4, .mov, .avi",
  },
  {
    name: "documents",
    value: ".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .csv",
  },
  {
    name: "audio",
    value: ".mp3, .wav, .aac, .ogg",
  },
  {
    name: "other (zip, rar, 7z, etc)",
    value: ".zip, .rar, .7z",
  },
];
