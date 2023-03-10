import { FC, useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useSections } from "./states/global.state";
import dynamic from "next/dynamic";
import { isEmpty } from "lodash";
import { useDeepCompareEffect } from "react-use";

const FormRenderer = dynamic(() => import("form renderer"), {
  ssr: false,
});

const Footer: FC = () => {
  const { checkError, checkValidationError } = useSections();
  return (
    <div className="h-12 border-t w-full bg-white shadow-md flex justify-end items-center px-4">
      <div>
        <PreviewButton />
        <Button
          className="ml-4"
          type="primary"
          onClick={() => {
            checkError();
            checkValidationError();
          }}
        >
          Save Form
        </Button>
      </div>
    </div>
  );
};

export default Footer;

const PreviewButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    sections,
    checkError,
    checkValidationError,
    validationErrors,
    errors,
  } = useSections();

  const modalOpenCondition =
    isModalVisible && isEmpty(validationErrors) && isEmpty(errors);

  useDeepCompareEffect(() => {
    modalOpenCondition && setIsModalVisible(false);
  }, [validationErrors, errors]);

  return (
    <>
      <Button
        onClick={() => {
          checkError();
          checkValidationError();
          setIsModalVisible(true);
        }}
        type="dashed"
      >
        Preview
      </Button>

      <Modal
        bodyStyle={{
          padding: 0,
          margin: 0,
          height: 460,
          display: "flex",
          flexDirection: "column",
        }}
        footer={[]}
        centered
        title="Preview Form"
        visible={modalOpenCondition}
        onCancel={() => setIsModalVisible(false)}
        width={1200}
        className="p-0 m-0"
      >
        <div style={{ flex: "1 1 auto" }} className="flex-1 overflow-y-scroll">
          {modalOpenCondition && (
            <FormRenderer
              formBuilderJson={modalOpenCondition ? sections : []}
            />
          )}
        </div>
      </Modal>
    </>
  );
};
