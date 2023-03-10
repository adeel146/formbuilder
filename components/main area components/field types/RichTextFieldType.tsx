import { FC } from "react";
import styled from "styled-components";
const HtmlToReactParser = require("html-to-react").Parser;

const htmlToReactParser = new HtmlToReactParser();

const RichTextFieldType: FC<any> = ({ options }) => {
  return (
    <HTMLRendererWrapper>
      {htmlToReactParser.parse(options["rich_text_default"])}
    </HTMLRendererWrapper>
  );
};

export default RichTextFieldType;

const HTMLRendererWrapper = styled.div`
  p {
    margin-bottom: 0px;
  }
`;
