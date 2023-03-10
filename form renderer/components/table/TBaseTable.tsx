import styled, { css } from "styled-components";
import {
  useTable,
  useBlockLayout,
  useResizeColumns,
  useRowSelect,
} from "react-table";
import React, { Dispatch, FC, SetStateAction } from "react";
import { Checkbox } from "antd";
import { useDeepCompareEffect } from "react-use";

export const Styles = styled.div`
  background-color: white;

  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid rgb(229, 231, 235);
    /* border-radius: 8px; */
    overflow: hidden;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      margin: 0;
      /* padding: 0.5rem; */
      border-bottom: 1px solid rgb(229, 231, 235);
      border-right: 1px solid rgb(229, 231, 235);

      ${
        "" /* In this example we use an absolutely position resizer,
       so this is required. */
      }
      position: relative;

      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        background-color: transparent;
        width: 4px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${"" /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;

        &:hover {
          background: ${(props) => props.theme.primary};
        }

        &.isResizing {
          background: blue;
        }
      }
    }
  }
`;

const CheckboxCellWrapper = styled.div<{ isSelected: boolean }>`
  ${(props) =>
    props.isSelected
      ? css`
          .checkbox-input-wrapper {
            display: block;
          }

          .row-input-wrapper {
            display: none;
          }

          :hover {
            .checkbox-input-wrapper {
              display: block;
            }
            .row-input-wrapper {
              display: none;
            }
          }
        `
      : css`
          .checkbox-input-wrapper {
            display: none;
          }

          .row-input-wrapper {
            display: block;
          }

          :hover {
            .checkbox-input-wrapper {
              display: block;
            }
            .row-input-wrapper {
              display: none;
            }
          }
        `}
`;

interface IIndeterminateCheckbox {
  [key: string]: any;
}

const IndeterminateCheckbox: FC<IIndeterminateCheckbox> = ({
  ref,
  indeterminate,
  ...rest
}) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <Checkbox ref={resolvedRef} {...rest} />
    </>
  );
};

export function TBaseTable({
  columns,
  data,
  setSelectedRows,
}: {
  columns: any[];
  data: any[];
  setSelectedRows: Dispatch<SetStateAction<number[]>>;
}) {
  const defaultColumn = React.useMemo(
    () => ({
      // minWidth: 180,
      width: 220,
      maxWidth: 1000,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          width: 40,
          minWidth: 40,
          maxWidth: 40,

          Header: ({
            getToggleAllRowsSelectedProps,
          }: {
            getToggleAllRowsSelectedProps: any;
          }) => (
            <div className="flex justify-center items-center h-full">
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),

          Cell: ({ row }: { row: any }) => {
            return (
              <CheckboxCellWrapper
                isSelected={!!row.isSelected}
                className="flex justify-center items-center h-full"
              >
                <div className="checkbox-input-wrapper">
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
                <div className="row-input-wrapper font-medium">
                  {row.index + 1}
                </div>
              </CheckboxCellWrapper>
            );
          },
        },
        ...columns,
      ]);
    }
  );

  const selectedRowIds = (state as any).selectedRowIds;

  useDeepCompareEffect(() => {
    setSelectedRows(Object.keys(selectedRowIds).map((v) => Number(v)));
  }, [selectedRowIds]);

  return (
    <>
      <div>
        <div {...getTableProps()} className="table">
          <div>
            {headerGroups.map((headerGroup, hi) => (
              <div
                {...headerGroup.getHeaderGroupProps()}
                key={hi}
                className="tr"
              >
                {headerGroup.headers.map((column: any, ci) => (
                  <>
                    <div
                      {...column.getHeaderProps()}
                      key={ci + hi}
                      className="th"
                    >
                      {column.render("Header")}
                      <div
                        {...column.getResizerProps()}
                        className={`resizer ${
                          column.isResizing ? "isResizing" : ""
                        }`}
                      />
                    </div>
                  </>
                ))}
              </div>
            ))}
          </div>

          <div {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <div
                  {...row.getRowProps()}
                  key={(row.original as any)?.id}
                  className="tr"
                >
                  {row.cells.map((cell, cellIndex) => {
                    return (
                      <div
                        {...cell.getCellProps()}
                        key={(row.original as any)?.id + cellIndex}
                        className="td"
                      >
                        {cell.render("Cell")}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
