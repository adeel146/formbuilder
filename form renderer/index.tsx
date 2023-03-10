import { Button } from "antd";
import { ISection } from "components/states/global.state";
import { FC } from "react";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import SingleRow from "./components/row/SingleRow";
import RTableArea from "./components/table/RTableArea";

const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();

const FormRenderer: FC<{ formBuilderJson: ISection[] }> = ({
  formBuilderJson,
}) => {
  const methods = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="p-4">
          {formBuilderJson.map((section) => {
            return (
              <div className="mb-4" key={section.id}>
                <HTMLRendererWrapper>
                  {htmlToReactParser.parse(section.name)}
                </HTMLRendererWrapper>
                <HTMLRendererWrapper>
                  {htmlToReactParser.parse(section.description)}
                </HTMLRendererWrapper>
                {section.type === "rows" && (
                  <>
                    {section.rows.map((row) => (
                      <SingleRow sectionId={section.id} key={row.id} {...row} />
                    ))}
                  </>
                )}

                {section.type === "table" && <RTableArea {...section} />}
              </div>
            );
          })}
        </div>
        <div className="px-5 pb-4">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default FormRenderer;

const HTMLRendererWrapper = styled.div`
  p {
    margin-bottom: 0px;
  }
`;
