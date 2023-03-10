import { Select } from "antd";
import { FC } from "react";
import currencyList from "currency-list";
import { useEffectOnce } from "react-use";
import { ErrorText } from "./ListSelectTypeComponent";
import { useSections } from "components/states/global.state";

interface IAcceptedCurrenciesComponent {
  value: any;
  setValue: (str: any) => any;
  hasError: boolean;
  onBlur: (str: any) => any;
}

const AcceptedCurrenciesComponent: FC<IAcceptedCurrenciesComponent> = ({
  value,
  setValue,
  hasError,
  onBlur,
}) => {
  const options = Object.values(currencyList.getAll("en_US")).map((curr) => ({
    label: `${curr.code} - ${curr.name}`,
    value: curr.code,
  }));

  const defaultValue = ["USD"];

  useEffectOnce(() => {
    setValue(value ?? defaultValue);
    onBlur(value ?? defaultValue);
  });

  return (
    <>
      <Select
        style={hasError ? { border: "1px solid #DF4440" } : {}}
        className="w-full"
        value={value ?? defaultValue}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        onSelect={() => onBlur(value)}
        onClear={() => onBlur(value)}
        mode="multiple"
        options={options}
        maxTagCount="responsive"
      />
      {hasError && <ErrorText>Please select default currency</ErrorText>}
    </>
  );
};

export default AcceptedCurrenciesComponent;
