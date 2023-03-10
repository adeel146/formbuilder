/* eslint-disable @next/next/no-img-element */
import { DragSectionPlusIcon } from "components/icons.list";
import toBase64 from "helpers/toBase64";
import { ChangeEvent, FC, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import RErrorMessageItem from "./RErrorMessageItem";
import { IRendererTypeGeneric } from "./RTextInput";
import { FileIcon } from "react-file-icon";
import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import produce from "immer";
import { message, Modal } from "antd";

interface IAttachment {
  content: string;
  extension: string;
}

const RAttachmentInput: FC<IRendererTypeGeneric> = ({
  options,
  baseForName,
  customValidationObject,
}) => {
  const { control } = useFormContext();
  const name = baseForName + options["field_id"];
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      required: {
        value: options["required"],
        message: `${options["name"]} is required`,
      },
      validate: customValidationObject,
    },
    defaultValue: options["default_value"] ?? [],
  });

  const maxFileSize = options["max_file_size"];

  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileWithBase64: any[] = [...value];
    const files = Array.from(e.target.files);
    for (const file of files) {
      if (maxFileSize && file.size > maxFileSize * 1048576) {
        message.error({
          content: `File Must be smaller then or equal to ${maxFileSize} MB`,
        });
        continue;
      }

      const FileExtension = file.name.split(".").pop();
      const FileContent = await toBase64(file);
      const obj = {
        content: FileContent,
        extension: FileExtension,
      };
      fileWithBase64.push(obj);
    }
    onChange(fileWithBase64);
    e.target.value = "";
  };

  const allowed_file_types = options["allowed_file_types"] ?? [];
  const allowed_file_types_str = allowed_file_types.join(", ");
  const allowed_file_types_str_lower = allowed_file_types_str.toLowerCase();

  const deleteAttachment = (index: number) => {
    const values = produce(value, (draft: any[]) => {
      draft.splice(index, 1);
    });

    onChange(values);
  };

  return (
    <>
      <RErrorMessageItem errors={errors} name={name} invalid={invalid}>
        <label htmlFor="upload-button">
          <div className="flex flex-wrap justify-start items-center gap-2">
            {value.map((attachment: IAttachment, index: number) => (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                key={index}
                className="rounded-sm border w-[80px] h-[80px] flex justify-center items-center relative"
              >
                {["png", "jpg", "jpeg"].includes(attachment.extension) ? (
                  <div
                    onClick={() => {
                      setSelectedIndex(index);
                    }}
                    className="flex-1 border h-full flex justify-center overflow-hidden items-center pt-3"
                  >
                    <img
                      src={`data:image/${attachment.extension};base64,${attachment.content}`}
                      alt="image"
                    />
                  </div>
                ) : (
                  <div className="flex-1 h-full flex justify-center items-center p-3">
                    <FileIcon extension={attachment.extension} />
                  </div>
                )}
                <DeleteIcon onClick={() => deleteAttachment(index)} />
              </div>
            ))}

            <div className="rounded-sm cursor-pointer border w-[80px] h-[80px] flex justify-center items-center fill-slate-500">
              <div className="transform scale-[2]">
                <DragSectionPlusIcon />
              </div>
            </div>
          </div>
          <input
            multiple={true}
            id="upload-button"
            className="hidden"
            accept={allowed_file_types_str_lower || "*"}
            type="file"
            ref={ref}
            onBlur={onBlur}
            onChange={(e) => onFileChange(e)}
          />
        </label>
      </RErrorMessageItem>
      <ImagesPreviewModal
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        attachments={value as IAttachment[]}
      />
    </>
  );
};

export default RAttachmentInput;

const DeleteIcon = styled(DeleteOutlined)`
  position: absolute;
  top: -4px;
  right: -4px;

  font-size: 20px;
  color: ${(props) => props.theme.icon_dark_grey};
  transition: all 0.5s;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.error_text};
  }
`;

const ImagesPreviewModal: FC<{
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
  attachments: IAttachment[];
}> = ({ selectedIndex, setSelectedIndex, attachments }) => {
  const attachment = attachments[selectedIndex ?? 0];

  return (
    <Modal
      onOk={() => setSelectedIndex(null)}
      onCancel={() => setSelectedIndex(null)}
      visible={selectedIndex !== null}
      cancelButtonProps={{ style: { display: "none" } }}
      title="Image Preview"
    >
      <div className="h-64 flex justify-center">
        <img
          src={`data:image/${attachment?.extension};base64,${attachment?.content}`}
          alt="image"
        />
      </div>
    </Modal>
  );
};
