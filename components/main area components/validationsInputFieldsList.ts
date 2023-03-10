import axios from "axios";
import moment from "moment";
import { array, string } from "yup";
import CurrencyInputValidation from "./drawer/validations/CurrencyInputValidation";
import DateInputValidation from "./drawer/validations/DateInputValidation";
import DateTimeInputValidation from "./drawer/validations/DateTimeInputValidation";
import NumberInputValidation from "./drawer/validations/NumberInputValidation";
import TextInputValidation from "./drawer/validations/TextInputValidation";
import YesNoInputValidation from "./drawer/validations/YesNoInputValidation";

export interface IInputValidationList {
  type: string;
  inputComponent: any;
  defaultValue: string | null;
  validationFunc: (
    value: any,
    errorMessage?: string,
    validationValue?: any,
    allChildOptions?: any
  ) => boolean | string | Promise<string | boolean>;
}

export const text_field_validation: IInputValidationList[] = [
  {
    type: "letters_only",
    inputComponent: () => null,
    defaultValue: null,
    validationFunc: (value, errorMessage) =>
      string()
        .trim()
        .matches(/^[aA-zZ\s]*$/)
        .isValidSync(value) ||
      errorMessage ||
      "Only letter are allowed",
  },
  {
    type: "min_length",
    inputComponent: NumberInputValidation,
    defaultValue: "",
    validationFunc: (value, errorMessage, validationValue) =>
      string().min(convertToNumberSafely(validationValue)).isValidSync(value) ||
      errorMessage ||
      `Enter at least ${validationValue} letters`,
  },
  {
    type: "max_length",
    inputComponent: NumberInputValidation,
    defaultValue: "",
    validationFunc: (value, errorMessage, validationValue) =>
      string().max(convertToNumberSafely(validationValue)).isValidSync(value) ||
      errorMessage ||
      `Max ${validationValue} letters allowed`,
  },
  {
    type: "contains",
    inputComponent: TextInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      value.toLowerCase().includes(validationValue) ||
      errorMessage ||
      `Value must contains ${validationValue}`,
  },
  {
    type: "does_not_contain",
    inputComponent: TextInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      !value.toLowerCase().includes(validationValue) ||
      errorMessage ||
      `Value must not contains ${validationValue}`,
  },
  {
    type: "numbers_only",
    inputComponent: () => null,
    defaultValue: null,
    validationFunc: (value = "", errorMessage) =>
      string()
        .matches(/^-?\d*\.?\d*$/)
        .isValidSync(value) ||
      errorMessage ||
      `Only numbers are allowed`,
  },
  {
    type: "email_format",
    inputComponent: () => null,
    defaultValue: null,
    validationFunc: (value, errorMessage) =>
      string().email().isValidSync(value) ||
      errorMessage ||
      "Enter a valid email address",
  },
  {
    type: "url_format",
    inputComponent: () => null,
    defaultValue: null,
    validationFunc: (value, errorMessage) =>
      string().url().isValidSync(value) || errorMessage || "Enter a valid url",
  },
  {
    type: "no_special_characters",
    inputComponent: () => null,
    defaultValue: null,
    validationFunc: (value = "", errorMessage) =>
      !string()
        .matches(/[^a-zA-Z0-9]/)
        .isValidSync(value) ||
      errorMessage ||
      `No special character`,
  },
  {
    type: "equal_to",
    inputComponent: TextInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      string().trim().oneOf([validationValue, ""]).isValidSync(value) ||
      errorMessage ||
      `Value must be equal to ${validationValue}`,
  },
  {
    type: "not_equal_to",
    inputComponent: TextInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      string().trim().notOneOf([validationValue]).isValidSync(value) ||
      errorMessage ||
      `Value not be equal to ${validationValue}`,
  },
  {
    type: "regex",
    inputComponent: TextInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) => {
      const regex = new RegExp(validationValue?.trim());
      return (
        string().matches(regex).isValidSync(value) ||
        errorMessage ||
        `Pattern not matched`
      );
    },
  },
];

export const text_area_validation: IInputValidationList[] = [
  {
    type: "min_length",
    inputComponent: NumberInputValidation,
    defaultValue: "",
    validationFunc: (value, errorMessage, validationValue) =>
      string().min(convertToNumberSafely(validationValue)).isValidSync(value) ||
      errorMessage ||
      `Enter at least ${validationValue} letters`,
  },
  {
    type: "max_length",
    inputComponent: NumberInputValidation,
    defaultValue: "",
    validationFunc: (value, errorMessage, validationValue) =>
      string().max(convertToNumberSafely(validationValue)).isValidSync(value) ||
      errorMessage ||
      `Max ${validationValue} letters allowed`,
  },
  {
    type: "contains",
    inputComponent: TextInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      value.toLowerCase().includes(validationValue) ||
      errorMessage ||
      `Value must contains ${validationValue}`,
  },
  {
    type: "does_not_contain",
    inputComponent: TextInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      !value.toLowerCase().includes(validationValue) ||
      errorMessage ||
      `Value must not contains ${validationValue}`,
  },
];

export const number_input_validations: IInputValidationList[] = [
  {
    type: "equal_to",
    inputComponent: NumberInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      convertToNumberSafely(value) === convertToNumberSafely(validationValue) ||
      errorMessage ||
      `Value must be equal to ${validationValue}`,
  },
  {
    type: "not_equal_to",
    inputComponent: NumberInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      convertToNumberSafely(value) !== convertToNumberSafely(validationValue) ||
      errorMessage ||
      `Value must not be equal to ${validationValue}`,
  },
  {
    type: "greater_than",
    inputComponent: NumberInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      convertToNumberSafely(value) > convertToNumberSafely(validationValue) ||
      errorMessage ||
      `Value must be greater than ${validationValue}`,
  },
  {
    type: "less_than",
    inputComponent: NumberInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      convertToNumberSafely(value) < convertToNumberSafely(validationValue) ||
      errorMessage ||
      `Value must be less than ${validationValue}`,
  },
  {
    type: "greater_than_or_equal_to",
    inputComponent: NumberInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      convertToNumberSafely(value) >= convertToNumberSafely(validationValue) ||
      errorMessage ||
      `Value must be greater than and equal to ${validationValue}`,
  },
  {
    type: "less_than_or_equal_to",
    inputComponent: NumberInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      convertToNumberSafely(value) <= convertToNumberSafely(validationValue) ||
      errorMessage ||
      `Value must be less than and equal to ${validationValue}`,
  },
];

export const date_input_validations: IInputValidationList[] = [
  {
    type: "in_the_past",
    inputComponent: () => null,
    defaultValue: null,
    validationFunc: (value = "", errorMessage) =>
      moment(value).isBefore(moment()) ||
      errorMessage ||
      `Value must be in the past`,
  },
  {
    type: "in_the_future",
    inputComponent: () => null,
    defaultValue: null,
    validationFunc: (value = "", errorMessage) =>
      moment(value).isAfter(moment()) ||
      errorMessage ||
      `Value must be in the future`,
  },
  {
    type: "not_in_the_past",
    inputComponent: () => null,
    defaultValue: null,
    validationFunc: (value = "", errorMessage) =>
      moment(value).startOf("day").isSameOrAfter(moment().startOf("day")) ||
      errorMessage ||
      `Value must not be in the past`,
  },
  {
    type: "equal_to",
    inputComponent: DateInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      moment(value)
        .startOf("day")
        .isSame(moment(validationValue).startOf("day")) ||
      errorMessage ||
      `Value must be equal to ${moment(validationValue).format("YYYY-MM-DD")}`,
  },
  {
    type: "not_equal_to",
    inputComponent: DateInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      !moment(value)
        .startOf("day")
        .isSame(moment(validationValue).startOf("day")) ||
      errorMessage ||
      `Value must no be equal to ${moment(validationValue).format(
        "YYYY-MM-DD"
      )}`,
  },
  {
    type: "greater_than",
    inputComponent: DateInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      moment(value)
        .endOf("day")
        .isAfter(moment(validationValue).endOf("day")) ||
      errorMessage ||
      `Value must be greater than ${moment(validationValue).format(
        "YYYY-MM-DD"
      )}`,
  },
  {
    type: "less_than",
    inputComponent: DateInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      moment(value)
        .startOf("day")
        .isBefore(moment(validationValue).startOf("day")) ||
      errorMessage ||
      `Value must be less than ${moment(validationValue).format("YYYY-MM-DD")}`,
  },
  {
    type: "greater_than_or_equal_to",
    inputComponent: DateInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      moment(value)
        .startOf("day")
        .isSameOrAfter(moment(validationValue).startOf("day")) ||
      errorMessage ||
      `Value must be greater than or equal to ${moment(validationValue).format(
        "YYYY-MM-DD"
      )}`,
  },
  {
    type: "less_than_or_equal_to",
    inputComponent: DateInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      moment(value)
        .startOf("day")
        .isSameOrBefore(moment(validationValue).startOf("day")) ||
      errorMessage ||
      `Value must be less than or equal to ${moment(validationValue).format(
        "YYYY-MM-DD"
      )}`,
  },
];

export const date_time_input_validations: IInputValidationList[] = [
  {
    type: "in_the_past",
    inputComponent: () => null,
    defaultValue: null,
    validationFunc: (value = "", errorMessage) =>
      moment(value).startOf("minute").isBefore(moment().startOf("minute")) ||
      errorMessage ||
      `Value must be in the past`,
  },
  {
    type: "in_the_future",
    inputComponent: () => null,
    defaultValue: null,
    validationFunc: (value = "", errorMessage) =>
      moment(value).startOf("minute").isAfter(moment().startOf("minute")) ||
      errorMessage ||
      `Value must be in the future`,
  },
  {
    type: "not_in_the_past",
    inputComponent: () => null,
    defaultValue: null,
    validationFunc: (value = "", errorMessage) =>
      moment(value)
        .startOf("minute")
        .isSameOrAfter(moment().startOf("minute")) ||
      errorMessage ||
      `Value must not be in the past`,
  },
  {
    type: "equal_to",
    inputComponent: DateTimeInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      moment(value)
        .startOf("minute")
        .isSame(moment(validationValue).startOf("minute")) ||
      errorMessage ||
      `Value must be equal to ${moment(validationValue).format(
        "YYYY-MM-DD hh:mm A"
      )}`,
  },
  {
    type: "not_equal_to",
    inputComponent: DateTimeInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      !moment(value)
        .startOf("minute")
        .isSame(moment(validationValue).startOf("minute")) ||
      errorMessage ||
      `Value must no be equal to ${moment(validationValue).format(
        "YYYY-MM-DD hh:mm A"
      )}`,
  },
  {
    type: "greater_than",
    inputComponent: DateTimeInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      moment(value)
        .startOf("minute")
        .isAfter(moment(validationValue).startOf("minute")) ||
      errorMessage ||
      `Value must be greater than ${moment(validationValue).format(
        "YYYY-MM-DD hh:mm A"
      )}`,
  },
  {
    type: "less_than",
    inputComponent: DateTimeInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      moment(value)
        .startOf("minute")
        .isBefore(moment(validationValue).startOf("minute")) ||
      errorMessage ||
      `Value must be less than ${moment(validationValue).format(
        "YYYY-MM-DD hh:mm A"
      )}`,
  },
  {
    type: "greater_than_or_equal_to",
    inputComponent: DateTimeInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      moment(value)
        .startOf("minute")
        .isSameOrAfter(moment(validationValue).startOf("minute")) ||
      errorMessage ||
      `Value must be greater than or equal to ${moment(validationValue).format(
        "YYYY-MM-DD hh:mm A"
      )}`,
  },
  {
    type: "less_than_or_equal_to",
    inputComponent: DateTimeInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      moment(value)
        .startOf("minute")
        .isSameOrBefore(moment(validationValue).startOf("minute")) ||
      errorMessage ||
      `Value must be less than or equal to ${moment(validationValue).format(
        "YYYY-MM-DD hh:mm A"
      )}`,
  },
];

export const drop_down_input_validations: IInputValidationList[] = [
  {
    type: "equal_to",
    inputComponent: TextInputValidation,
    defaultValue: "",
    validationFunc: async (
      value = "",
      errorMessage,
      validationValue,
      allChildOptions
    ) => {
      const list_Id = allChildOptions["list"];
      return (
        (await string()
          .trim()
          .test("equal_to_check", "issue", async (v) => {
            return axios
              .get<{ data: { id: number; text: string }[] }>(
                `/list_option/${list_Id}`
              )
              .then((res) => {
                const inputValue = convertToNumberSafely(v as string);
                const data = res.data?.data?.find((d) => d.id === inputValue);

                if (data) {
                  return string()
                    .trim()
                    .oneOf([validationValue])
                    .isValidSync(data.text);
                }

                return false;
              })
              .catch(() => {
                return false;
              });
          })
          .isValid(value)) ||
        errorMessage ||
        `Value must be equal to ${validationValue}`
      );
    },
  },
  {
    type: "not_equal_to",
    inputComponent: TextInputValidation,
    defaultValue: "",
    validationFunc: async (
      value = "",
      errorMessage,
      validationValue,
      allChildOptions
    ) => {
      const list_Id = allChildOptions["list"];
      return (
        (await string()
          .trim()
          .test("not_equal_to_check", "issue", async (v) => {
            return axios
              .get<{ data: { id: number; text: string }[] }>(
                `/list_option/${list_Id}`
              )
              .then((res) => {
                const inputValue = convertToNumberSafely(v as string);
                const data = res.data?.data?.find((d) => d.id === inputValue);

                if (data) {
                  return string()
                    .trim()
                    .notOneOf([validationValue])
                    .isValidSync(data.text);
                }

                return false;
              })
              .catch(() => {
                return false;
              });
          })
          .isValid(value)) ||
        errorMessage ||
        `Value not be equal to ${validationValue}`
      );
    },
  },
];

export const yes_no_input_validations: IInputValidationList[] = [
  {
    type: "yes",
    inputComponent: () => null,
    defaultValue: null,
    validationFunc: (value, errorMessage) =>
      value === true || errorMessage || `Select Yes`,
  },
  {
    type: "no",
    inputComponent: () => null,
    defaultValue: null,
    validationFunc: (value, errorMessage) =>
      value === false || errorMessage || `Select No`,
  },
  {
    type: "equal_to",
    inputComponent: YesNoInputValidation,
    defaultValue: "",
    validationFunc: (value, errorMessage, validationValue) =>
      value === validationValue ||
      errorMessage ||
      `Value must be equal to ${validationValue ? "Yes" : "No"}`,
  },
  {
    type: "not_equal_to",
    inputComponent: YesNoInputValidation,
    defaultValue: "",
    validationFunc: (value, errorMessage, validationValue) =>
      !(value === validationValue) ||
      errorMessage ||
      `Value not be equal to ${validationValue ? "Yes" : "No"}`,
  },
];

export const multi_select_validations: IInputValidationList[] = [
  {
    type: "min_number_of_selections",
    inputComponent: NumberInputValidation,
    defaultValue: "",
    validationFunc: (value = [], errorMessage, validationValue) =>
      value.length >= convertToNumberSafely(validationValue) ||
      errorMessage ||
      `Select at least ${validationValue} value`,
  },
  {
    type: "max_number_of_selections",
    inputComponent: NumberInputValidation,
    defaultValue: "",
    validationFunc: (value = [], errorMessage, validationValue) =>
      value.length <= convertToNumberSafely(validationValue) ||
      errorMessage ||
      `You can only select max ${validationValue} options`,
  },
  {
    type: "selection_should_contain",
    inputComponent: TextInputValidation,
    defaultValue: "",
    validationFunc: async (
      value = [],
      errorMessage,
      validationValue,
      allChildOptions
    ) => {
      const list_Id = allChildOptions["list"];
      return (
        (await array()
          .test("equal_to_check", "issue", async (v) => {
            return axios
              .get<{ data: { id: number; text: string }[] }>(
                `/list_option/${list_Id}`
              )
              .then((res) => {
                const data = res.data?.data
                  ?.filter((d) => v?.includes(d.id))
                  .map((d) => d.text)
                  .join(",");

                if (data) {
                  return data
                    .toLowerCase()
                    .includes(validationValue.toLowerCase());
                }

                return false;
              })
              .catch(() => {
                return false;
              });
          })
          .isValid(value)) ||
        errorMessage ||
        `Value must contains ${validationValue}`
      );
    },
  },
  {
    type: "selection_should_not_contain",
    inputComponent: TextInputValidation,
    defaultValue: "",
    validationFunc: async (
      value = [],
      errorMessage,
      validationValue,
      allChildOptions
    ) => {
      const list_Id = allChildOptions["list"];
      return (
        (await array()
          .test("equal_to_check", "issue", async (v) => {
            return axios
              .get<{ data: { id: number; text: string }[] }>(
                `/list_option/${list_Id}`
              )
              .then((res) => {
                const data = res.data?.data
                  ?.filter((d) => v?.includes(d.id))
                  .map((d) => d.text)
                  .join(",");

                if (data) {
                  return !data
                    .toLowerCase()
                    .includes(validationValue.toLowerCase());
                }

                return false;
              })
              .catch(() => {
                return false;
              });
          })
          .isValid(value)) ||
        errorMessage ||
        `Value must not contains ${validationValue}`
      );
    },
  },
];

export const checkbox_validations: IInputValidationList[] = [
  ...multi_select_validations,
];

export const currency_type_validations: IInputValidationList[] = [
  {
    type: "equal_to",
    inputComponent: CurrencyInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      convertToNumberSafely(value) === convertToNumberSafely(validationValue) ||
      errorMessage ||
      `Value must be equal to ${validationValue}`,
  },
  {
    type: "not_equal_to",
    inputComponent: CurrencyInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      convertToNumberSafely(value) !== convertToNumberSafely(validationValue) ||
      errorMessage ||
      `Value must not be equal to ${validationValue}`,
  },
  {
    type: "greater_than",
    inputComponent: CurrencyInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      convertToNumberSafely(value) > convertToNumberSafely(validationValue) ||
      errorMessage ||
      `Value must be greater than ${validationValue}`,
  },
  {
    type: "less_than",
    inputComponent: CurrencyInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      convertToNumberSafely(value) < convertToNumberSafely(validationValue) ||
      errorMessage ||
      `Value must be less than ${validationValue}`,
  },
  {
    type: "greater_than_or_equal_to",
    inputComponent: CurrencyInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      convertToNumberSafely(value) >= convertToNumberSafely(validationValue) ||
      errorMessage ||
      `Value must be greater than and equal to ${validationValue}`,
  },
  {
    type: "less_than_or_equal_to",
    inputComponent: CurrencyInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      convertToNumberSafely(value) <= convertToNumberSafely(validationValue) ||
      errorMessage ||
      `Value must be less than and equal to ${validationValue}`,
  },
];

export const email_type_validations: IInputValidationList[] = [
  {
    type: "equal_to",
    inputComponent: TextInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      string().trim().oneOf([validationValue, ""]).isValidSync(value) ||
      errorMessage ||
      `Value must be equal to ${validationValue}`,
  },
  {
    type: "not_equal_to",
    inputComponent: TextInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      string().trim().notOneOf([validationValue]).isValidSync(value) ||
      errorMessage ||
      `Value not be equal to ${validationValue}`,
  },
  {
    type: "contains",
    inputComponent: TextInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      value.toLowerCase().includes(validationValue) ||
      errorMessage ||
      `Value must contains ${validationValue}`,
  },
  {
    type: "does_not_contain",
    inputComponent: TextInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      !value.toLowerCase().includes(validationValue) ||
      errorMessage ||
      `Value must not contains ${validationValue}`,
  },
  {
    type: "starts_with",
    inputComponent: TextInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      value.toLowerCase().startsWith(validationValue?.toLowerCase() ?? "") ||
      errorMessage ||
      `Value must starts with ${validationValue}`,
  },
  {
    type: "ends_with",
    inputComponent: TextInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      value.toLowerCase().endsWith(validationValue?.toLowerCase() ?? "") ||
      errorMessage ||
      `Value must ends with ${validationValue}`,
  },
  {
    type: "domain_equal_to",
    inputComponent: TextInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      value.substring(value.lastIndexOf("@") + 1) === validationValue ||
      errorMessage ||
      `Domain must be equal to ${validationValue}`,
  },
  {
    type: "domain_not_equal_to",
    inputComponent: TextInputValidation,
    defaultValue: "",
    validationFunc: (value = "", errorMessage, validationValue) =>
      !(value.substring(value.lastIndexOf("@") + 1) === validationValue) ||
      errorMessage ||
      `Domain not be equal to  ${validationValue}`,
  },
];

export const attachment_type_validations: IInputValidationList[] = [
  {
    type: "min_number_of_attachments",
    inputComponent: NumberInputValidation,
    defaultValue: "",
    validationFunc: (value = [], errorMessage, validationValue) =>
      value.length >= convertToNumberSafely(validationValue) ||
      errorMessage ||
      `Select at least ${validationValue} ${
        validationValue === 1 ? "file" : "files"
      }`,
  },
  {
    type: "max_number_of_attachments",
    inputComponent: NumberInputValidation,
    defaultValue: "",
    validationFunc: (value = [], errorMessage, validationValue) =>
      value.length <= convertToNumberSafely(validationValue) ||
      errorMessage ||
      `You can only select max ${validationValue} ${
        validationValue === 1 ? "file" : "files"
      } `,
  },
];

export const convertToNumberSafely = (toNumber: string) => {
  const result = Number(toNumber);
  return isNaN(result) ? 0 : result;
};

export const countDecimals = function (value: number) {
  if (Math.floor(value) === value) return 0;
  return value?.toString()?.split(".")[1]?.length ?? 0;
};
