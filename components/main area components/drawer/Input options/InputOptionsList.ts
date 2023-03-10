import AcceptedCurrenciesComponent from "./components/AcceptedCurrenciesComponent";
import AllowedFileTypes from "./components/AllowedFileTypes";
import CheckboxDefaultValue from "./components/CheckboxDefaultValue";
import DefaultRichTextComponent from "./components/DefaultRichTextComponent";
import DefaultValueDateComponent from "./components/DefaultValueDateComponent";
import DefaultValueDateTimeComponent from "./components/DefaultValueDateTimeComponent";
import DefaultValueStarRatingComponent from "./components/DefaultValueStarRatingComponent";
import DefaultValueWithMask from "./components/DefaultValueWithMask";
import DefaultValueYesNoComponent from "./components/DefaultValueYesNoComponent";
import DependentFieldComponent from "./components/DependentFieldComponent";
import FieldTypeComponent from "./components/FieldTypeComponent";
import InputNameOptionComponent from "./components/InputNameOptionComponent";
import InputOptionComponent from "./components/InputOptionComponent";
import ListMultipleDefaultValue from "./components/ListMultipleDefaultValue";
import ListSelectDefaultComponent from "./components/ListSelectDefaultComponent";
import ListSelectTypeComponent from "./components/ListSelectTypeComponent";
import MaskedInputValueSchema from "./components/MaskedInputValueSchema";
import RequiredOptionComponent from "./components/RequiredOptionComponent";

export interface IInputOptionsList {
  id: string;
  keyFelidForOption: string;
  label: string;
  isRequired: boolean;
  component: any;
}

const InputOptionsList: IInputOptionsList[] = [
  {
    id: "name",
    keyFelidForOption: "name",
    label: "Name",
    isRequired: true,
    component: InputNameOptionComponent,
  },
  {
    id: "field_type",
    keyFelidForOption: "field_type",
    label: "Field Type",
    isRequired: false,
    component: FieldTypeComponent,
  },
  {
    id: "required",
    keyFelidForOption: "required",
    label: "Required ?",
    isRequired: false,
    component: RequiredOptionComponent,
  },
  {
    id: "field_id",
    keyFelidForOption: "field_id",
    label: "Field ID",
    isRequired: true,
    component: InputOptionComponent,
  },
  {
    id: "help_text",
    keyFelidForOption: "help_text",
    label: "Help Text",
    isRequired: false,
    component: InputOptionComponent,
  },
  {
    id: "select_list",
    keyFelidForOption: "list",
    label: "Select a list",
    isRequired: true,
    component: ListSelectTypeComponent,
  },
  {
    id: "default_value",
    keyFelidForOption: "default_value",
    label: "Default Value",
    isRequired: false,
    component: InputOptionComponent,
  },
  {
    id: "default_value_mask",
    keyFelidForOption: "default_value",
    label: "Default Value",
    isRequired: false,
    component: DefaultValueWithMask,
  },
  {
    id: "default_value_date",
    keyFelidForOption: "default_value",
    label: "Default Value",
    isRequired: false,
    component: DefaultValueDateComponent,
  },
  {
    id: "default_value_date_time",
    keyFelidForOption: "default_value",
    label: "Default Value",
    isRequired: false,
    component: DefaultValueDateTimeComponent,
  },
  {
    id: "default_value_yes_no",
    keyFelidForOption: "default_value",
    label: "Default Value",
    isRequired: false,
    component: DefaultValueYesNoComponent,
  },
  {
    id: "default_value_star_rating",
    keyFelidForOption: "default_value",
    label: "Default Value",
    isRequired: false,
    component: DefaultValueStarRatingComponent,
  },
  {
    id: "default_value_select",
    keyFelidForOption: "default_value",
    label: "Default Value",
    isRequired: false,
    component: ListSelectDefaultComponent,
  },
  {
    id: "default_value_multiple_select",
    keyFelidForOption: "default_value",
    label: "Default Value",
    isRequired: false,
    component: ListMultipleDefaultValue,
  },
  {
    id: "dependent_list",
    keyFelidForOption: "dependent_list",
    label: "Dependent List",
    isRequired: false,
    component: DependentFieldComponent,
  },
  {
    id: "default_value_check_box",
    keyFelidForOption: "default_value",
    label: "Default Value",
    isRequired: false,
    component: CheckboxDefaultValue,
  },
  {
    id: "decimal_places",
    keyFelidForOption: "decimal_places",
    label: "Number of decimal places",
    isRequired: false,
    component: InputOptionComponent,
  },
  {
    id: "select_a_list",
    keyFelidForOption: "select_a_list",
    label: "Select a list",
    isRequired: true,
    component: InputOptionComponent,
  },
  {
    id: "default_selection",
    keyFelidForOption: "default_selection",
    label: "Default selection",
    isRequired: false,
    component: InputOptionComponent,
  },
  {
    id: "accepted_currencies",
    keyFelidForOption: "accepted_currencies",
    label: "Accepted currencies",
    isRequired: true,
    component: AcceptedCurrenciesComponent,
  },
  {
    id: "rich_text_default",
    keyFelidForOption: "rich_text_default",
    label: "Rich Textarea",
    isRequired: false,
    component: DefaultRichTextComponent,
  },
  {
    id: "mask_input_schema",
    keyFelidForOption: "mask_input_schema",
    label: "Mask Input Schema",
    isRequired: false,
    component: MaskedInputValueSchema,
  },
  {
    id: "allowed_file_types",
    keyFelidForOption: "allowed_file_types",
    label: "Allowed file types",
    isRequired: false,
    component: AllowedFileTypes,
  },
  {
    id: "max_file_size",
    keyFelidForOption: "max_file_size",
    label: "Max File Size ( in MB )",
    isRequired: false,
    component: InputOptionComponent,
  },
];

export default InputOptionsList;
