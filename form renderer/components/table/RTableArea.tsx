import { Button } from "antd";
import { ISection } from "components/states/global.state";
import { FC, useState } from "react";
import { useFieldArray } from "react-hook-form";
import RReactTable from "./RReactTable";

interface IRTableArea extends ISection {}

const RTableArea: FC<IRTableArea> = ({ rows, id }) => {
  const { fields, append, remove } = useFieldArray({
    name: id,
  });
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  return (
    <div className="flex flex-1">
      <div
        style={{
          flex: "1 1 auto",
          overflowX: "auto",
          overflowY: "hidden",
        }}
        className="w-0 flex flex-1"
      >
        <div className="flex-1">
          <RReactTable
            setSelectedRows={setSelectedRows}
            data={fields}
            configData={rows[0].children}
            sectionId={id}
          />
          <Button onClick={() => append({})} type="primary">
            Add
          </Button>
          {!!selectedRows.length && (
            <Button
              onClick={() => remove(selectedRows)}
              type="primary"
              className="ml-2"
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RTableArea;
