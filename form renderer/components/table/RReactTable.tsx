import React, { Dispatch, FC, SetStateAction } from "react";
import RTableHeader from "./RTableHeader";
import { IRowChildren } from "components/states/global.state";
import rInputTypesConfig from "../renderer input types/rInputTypes.config";
import createValidationObject from "../renderer input types/createValidationObject";
import { Styles, TBaseTable } from "./TBaseTable";

const RReactTable: FC<{
  configData: (IRowChildren | null)[];
  sectionId: string;
  data: Record<"id", string>[];
  setSelectedRows: Dispatch<SetStateAction<number[]>>;
}> = ({ configData, sectionId, data, setSelectedRows }) => {
  const columns = React.useMemo(() => {
    const columns = configData.map((child) => ({
      Header: () => {
        return (
          child && <RTableHeader type={child.type} options={child.options} />
        );
      },
      accessor: child?.id,
      minWidth: 180,
      Cell: ({ row }: any) => {
        const FoundInputType = rInputTypesConfig.find(
          (rif) => rif.id === child?.type
        );

        const customValidationObject = createValidationObject({
          allAvailableValidations: FoundInputType?.validations ?? [],
          currentInputValidation: child?.validations ?? [],
          allChildOptions: child?.options,
        });

        const baseForName = `${sectionId}.[${row.index}].`;

        return (
          <div className="p-2">
            {FoundInputType && (
              <FoundInputType.InputComponent
                baseForName={baseForName}
                {...child}
                sectionId={sectionId}
                customValidationObject={customValidationObject}
              />
            )}
          </div>
        );
      },
    }));
    return [...columns];
  }, [configData, sectionId]);

  return (
    <Styles>
      <TBaseTable
        setSelectedRows={setSelectedRows}
        columns={columns}
        data={data}
      />
    </Styles>
  );
};

export default RReactTable;
