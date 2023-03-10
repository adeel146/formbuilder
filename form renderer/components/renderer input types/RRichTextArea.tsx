import { FC } from "react";
import styled from "styled-components";
import { IRendererTypeGeneric } from "./RTextInput";
const HtmlToReactParser = require("html-to-react").Parser;

const htmlToReactParser = new HtmlToReactParser();

const RRichTextArea: FC<IRendererTypeGeneric> = ({ options }) => {
  return (
    <HTMLRendererWrapper>
      {htmlToReactParser.parse(options["rich_text_default"])}
    </HTMLRendererWrapper>
  );
};

export default RRichTextArea;

const HTMLRendererWrapper = styled.div`
  p {
    margin-bottom: 0px;
  }
`;
