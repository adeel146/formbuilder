import { Select } from 'antd';
import inputFieldsList from 'components/main area components/inputFieldsList';
import { useSections } from 'components/states/global.state';
import { FC } from 'react';
import styled from 'styled-components';

interface IFieldTypeComponent {
  currentType: any;
}

const FieldTypeComponent: FC<IFieldTypeComponent> = ({ currentType }) => {
  const { changeInputTypeInRowColumn } = useSections();
  return (
    <>
      <Select
        onChange={(option) => {
          changeInputTypeInRowColumn(option);
        }}
        className="w-full"
        options={inputFieldsList.map((field) => ({
          value: field.id,
          label: (
            <SelectLabel>
              <field.icon />{' '}
              <div className="ml-1 font-medium">{field.name}</div>
            </SelectLabel>
          ),
        }))}
        value={currentType}
      />
    </>
  );
};

export default FieldTypeComponent;

const SelectLabel = styled.div`
  display: flex;
  align-items: center;
  svg {
    transform: scale(0.8);
  }
`;
