import {
  attachment_type_validations,
  checkbox_validations,
  currency_type_validations,
  date_input_validations,
  date_time_input_validations,
  drop_down_input_validations,
  email_type_validations,
  IInputValidationList,
  multi_select_validations,
  number_input_validations,
  text_area_validation,
  text_field_validation,
  yes_no_input_validations,
} from "components/main area components/validationsInputFieldsList";
import { FC } from "react";
import RAttachmentInput from "./RAttachmentInput";
import RCheckboxInput from "./RCheckboxInput";
import RCurrenciesComponent from "./RCurrenciesComponent";
import RDateInput from "./RDateInput";
import RDateTimeInput from "./RDateTimeInput";
import REmailInput from "./REmailInput";
import RMultiSelectInput from "./RMultiSelectInput";
import RNumberInput from "./RNumberInput";
import RRatingComponent from "./RRatingComponent";
import RRichTextArea from "./RRichTextArea";
import RSelectInput from "./RSelectInput";
import RTextArea from "./RTextArea";
import RTextInput, { IRendererTypeGeneric } from "./RTextInput";
import RYesNoCheckbox from "./RYesNoCheckbox";

interface IRInputType {
  InputComponent: FC<IRendererTypeGeneric>;
  id: string;
  validations: IInputValidationList[];
}

const rInputTypesConfig: IRInputType[] = [
  {
    InputComponent: RTextInput,
    id: "text_field_type",
    validations: text_field_validation,
  },
  {
    InputComponent: RTextArea,
    id: "text_area_type",
    validations: text_area_validation,
  },
  {
    InputComponent: RNumberInput,
    id: "number_input_type",
    validations: number_input_validations,
  },
  {
    InputComponent: RDateInput,
    id: "date_input_type",
    validations: date_input_validations,
  },
  {
    InputComponent: RDateTimeInput,
    id: "date_time_input_type",
    validations: date_time_input_validations,
  },
  {
    InputComponent: RSelectInput,
    id: "drop_down_input_type",
    validations: drop_down_input_validations,
  },
  {
    InputComponent: RMultiSelectInput,
    id: "multi_select_type",
    validations: multi_select_validations,
  },
  {
    InputComponent: RYesNoCheckbox,
    id: "yes_no_type",
    validations: yes_no_input_validations,
  },
  {
    InputComponent: RCurrenciesComponent,
    id: "currency_type",
    validations: currency_type_validations,
  },
  {
    InputComponent: REmailInput,
    id: "email_type",
    validations: email_type_validations,
  },
  {
    InputComponent: RRatingComponent,
    id: "rating_type",
    validations: [],
  },
  {
    InputComponent: RAttachmentInput,
    id: "attachment_type",
    validations: attachment_type_validations,
  },
  {
    InputComponent: RCheckboxInput,
    id: "checkbox_type",
    validations: checkbox_validations,
  },
  {
    InputComponent: RRichTextArea,
    id: "rich_text_area",
    validations: [],
  },
];

export default rInputTypesConfig;
