import { Select } from "antd";
import { useSections } from "components/states/global.state";
import { FC, useState } from "react";
import { useDeepCompareEffect } from "react-use";

const { Option } = Select;

interface IDependentFieldComponent {
  value: any;
  setValue: (str: any) => any;
  getOtherFieldValue: (str: string) => any;
  childId: string;
}

interface MainList {
  id: string;
  text: string;
}

const DependentFieldComponent: FC<IDependentFieldComponent> = ({
  value,
  setValue,
  childId,
}) => {
  const [options, setOptions] = useState<MainList[]>([]);
  const { sections } = useSections();
  const own_field_id = childId;

  useDeepCompareEffect(() => {
    const tempArr: MainList[] = [];
    sections.forEach((sec) => {
      sec.rows.forEach((r) => {
        r.children.forEach((child) => {
          if (child) {
            const field_id = child.id;
            const name = child.options["name"] as string;
            if (
              own_field_id === field_id ||
              !["drop_down_input_type", "multi_select_type"].includes(
                child.type
              )
            )
              return;
            tempArr.push({
              id: field_id,
              text: name,
            });
          }
        });
      });
    });

    setOptions(tempArr);
  }, [sections, own_field_id]);

  return (
    <>
      <Select
        mode="multiple"
        value={value}
        className="w-full"
        onChange={setValue}
      >
        {options?.map((val) => (
          <Option key={val.id} value={val.id}>
            {val.text}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default DependentFieldComponent;
