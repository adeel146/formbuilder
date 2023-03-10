import create from "zustand";
import { v4 as uuid } from "uuid";
import produce from "immer";
import { DraggableLocation } from "react-beautiful-dnd";
import { nanoid } from "nanoid";
import InputOptionsList from "components/main area components/drawer/Input options/InputOptionsList";
import _, { has, includes, isArray, last, reject } from "lodash";
import inputFieldsList from "components/main area components/inputFieldsList";

export type RowTypeEnum = "single" | "double" | "triple";
export type SectionTypeEnum = "rows" | "table";

export interface IRowValidations {
  type: string;
  value: any;
  errorMessage?: string;
}

export interface IRowChildren {
  type: string;
  validations: IRowValidations[];
  options: any;
  id: string;
}

export interface ISectionRow {
  type: RowTypeEnum;
  children: (IRowChildren | null)[];
  id: string;
}

export interface ISection {
  name: string;
  id: string;
  description: string;
  rows: ISectionRow[];
  type: SectionTypeEnum;
}

interface IUseSections {
  sections: ISection[];
  errors: { [key: string]: string[] };
  validationErrors: { [key: string]: string[] };
  disableLeftHoverAndDrop: boolean;
  toggleDisableHoverAndDrop: () => void;
  selectedSectionForOptionDialog: string;
  setValueForSelectedSectionForOptionDialog: (value: string) => void;
  selectedColumnForOptionDialog: string;
  setValueForSelectedColumnForOptionDialog: (value: string) => void;
  onChangeName: (id: ISection["id"], name: ISection["name"]) => void;
  onChangeDescription: (
    id: ISection["id"],
    description: ISection["description"]
  ) => void;
  duplicateSection: (id: ISection["id"]) => void;
  moveItem: (index: number, moveto: number) => void;
  deleteItem: (id: ISection["id"]) => void;
  addItem: (type: SectionTypeEnum) => void;
  moveRows: (source: DraggableLocation, destination: DraggableLocation) => void;
  addInputsRows: (draggableId: string, destination: DraggableLocation) => void;
  addInputsIntoTable: (
    draggableId: string,
    destination: DraggableLocation
  ) => void;
  addNewRowOnDrop: (
    draggableId: string,
    destination: DraggableLocation
  ) => void;
  changeRowColumns: (
    sectionId: ISection["id"],
    rowId: ISectionRow["id"],
    type: ISectionRow["type"]
  ) => void;
  moveInputBetweenSections: (
    source: DraggableLocation,
    destination: DraggableLocation
  ) => void;
  moveInputBetweenTableColumns: (
    source: DraggableLocation,
    destination: DraggableLocation
  ) => void;
  moveInputToNewRow: (
    source: DraggableLocation,
    destination: DraggableLocation
  ) => void;
  deleteRowColumn: (
    sectionId: string,
    rowId: string,
    columnIndex: string
  ) => void;
  changeInputOptionsValueGeneric: (optionId: string, value: any) => void;
  changeInputTypeInRowColumn: (newType: string) => void;
  addValidationRuleToInput: (
    validationType: string,
    defaultValue: string | null
  ) => void;
  setInputValidationValue: (
    validationIndex: number,
    validation: Omit<IRowValidations, "type">
  ) => void;
  deleteValidationRuleToInput: (validationIndex: number) => void;
  checkError: () => void;
  addError: (childId: string, filedName: string) => void;
  removeError: (childId: string, filedName: string) => void;
  addValidationError: (childId: string, errorName: string) => void;
  removeValidationError: (childId: string, errorName: string) => void;
  checkValidationError: () => void;
}

export const defaultRowsBlueprint: ISectionRow[] = [
  {
    id: uuid(),
    type: "single",
    children: [null],
  },
  {
    id: uuid(),
    type: "double",
    children: [null, null],
  },
  {
    id: uuid(),
    type: "triple",
    children: [null, null, null],
  },
];

const defaultSection = (): ISection => ({
  name: "United section",
  id: uuid(),
  description: "Enter your section description",
  rows: [],
  type: "rows",
});

const defaultSectionTable = (): ISection => ({
  name: "United section",
  id: uuid(),
  description: "Enter your section description",
  rows: [
    {
      id: uuid(),
      type: "single",
      children: [],
    },
  ],
  type: "table",
});

const defaultOptions = {
  name: "United Field",
  help_text: "",
};

export const useSections = create<IUseSections>((set) => ({
  sections: [defaultSection()],
  disableLeftHoverAndDrop: false,
  selectedColumnForOptionDialog: "",
  selectedSectionForOptionDialog: "",
  errors: {},
  validationErrors: {},
  setValueForSelectedColumnForOptionDialog: (value) =>
    set((state) => {
      return produce(state, (draft) => {
        draft.selectedColumnForOptionDialog = value;
        if (value && draft.selectedSectionForOptionDialog) {
          draft.selectedSectionForOptionDialog = "";
        }
      });
    }),

  setValueForSelectedSectionForOptionDialog: (value) =>
    set((state) => {
      return produce(state, (draft) => {
        draft.selectedSectionForOptionDialog = value;
        if (value && draft.selectedColumnForOptionDialog) {
          draft.selectedColumnForOptionDialog = "";
        }
      });
    }),

  toggleDisableHoverAndDrop: () =>
    set((state) => {
      return produce(state, (draft) => {
        draft.disableLeftHoverAndDrop = !state.disableLeftHoverAndDrop;
      });
    }),

  onChangeName: (id, name) =>
    set((state) => {
      return produce(state, (draft) => {
        const foundIndex = draft.sections.findIndex((s) => s.id === id);
        draft.sections[foundIndex].name = name;
      });
    }),

  onChangeDescription: (id, description) =>
    set((state) => {
      return produce(state, (draft) => {
        const foundIndex = draft.sections.findIndex((s) => s.id === id);
        draft.sections[foundIndex].description = description;
      });
    }),

  duplicateSection: (id) =>
    set((state) => {
      return produce(state, (draft) => {
        const foundSection = draft.sections.find((s) => s.id === id);

        const newSection = {
          ...foundSection,
          id: uuid(),
          rows: foundSection?.rows.map((row) => ({
            ...row,
            id: uuid(),
            children: row.children.map((child) => ({
              ...child,
            })),
          })),
        };

        draft.sections.push(newSection as ISection);
        draft.selectedSectionForOptionDialog = "";
      });
    }),

  moveItem: (index, moveto) =>
    set((state) => {
      return produce(state, (draft) => {
        const currentSection = draft.sections.splice(index, 1);
        draft.sections.splice(moveto, 0, currentSection[0]);
        draft.selectedSectionForOptionDialog = "";
      });
    }),

  deleteItem: (id) =>
    set((state) => {
      return produce(state, (draft) => {
        const foundIndex = draft.sections.findIndex((s) => s.id === id);
        draft.sections.splice(foundIndex, 1);
        draft.selectedSectionForOptionDialog = "";
      });
    }),

  addItem: (type) =>
    set((state) => {
      return produce(state, (draft) => {
        const newSection = {
          ...(type === "table" ? defaultSectionTable() : defaultSection()),
        };
        draft.sections.push(newSection);
      });
    }),

  moveRows: (source, destination) =>
    set((state) => {
      return produce(state, (draft) => {
        if (source.droppableId === destination.droppableId) {
          const section = draft.sections.find(
            (sec) => sec.id === destination.droppableId
          );
          const row = section?.rows.splice(source.index, 1) as ISectionRow[];
          section?.rows.splice(destination.index, 0, row[0]);
        }

        if (source.droppableId !== destination.droppableId) {
          const sourceSection = draft.sections.find(
            (sec) => sec.id === source.droppableId
          );
          const destinationSection = draft.sections.find(
            (sec) => sec.id === destination.droppableId
          );
          const row = sourceSection?.rows.splice(
            source.index,
            1
          ) as ISectionRow[];
          destinationSection?.rows.splice(destination.index, 0, row[0]);
        }
      });
    }),

  addInputsRows: (draggableId, destination) =>
    set((state) => {
      return produce(state, (draft) => {
        const [sectionId, rowId, index] = destination.droppableId.split(",");
        const section = draft.sections.find((sec) => sec.id === sectionId);
        const row = section?.rows.find((r) => r.id === rowId);
        row?.children.splice(+index, 1, {
          id: uuid(),
          type: draggableId,
          options: {
            ...defaultOptions,
            field_id:
              defaultOptions.name.replace(/[\W_]/g, "_") + "_" + nanoid(6),
          },
          validations: [],
        });
        draft.selectedColumnForOptionDialog = `${destination.droppableId},settings`;
      });
    }),

  addInputsIntoTable: (draggableId, destination) =>
    set((state) => {
      return produce(state, (draft) => {
        const [sectionId, rowId] = destination.droppableId.split(",");
        const section = draft.sections.find((sec) => sec.id === sectionId);
        const row = section?.rows.find((r) => r.id === rowId);
        row?.children.splice(destination.index, 0, {
          id: uuid(),
          type: draggableId,
          options: {
            ...defaultOptions,
            field_id:
              defaultOptions.name.replace(/[\W_]/g, "_") + "_" + nanoid(6),
          },
          validations: [],
        });
        draft.selectedColumnForOptionDialog = `${[
          sectionId,
          rowId,
          destination.index,
        ].toString()},settings`;
      });
    }),

  addNewRowOnDrop: (draggableId, destination) =>
    set((state) => {
      return produce(state, (draft) => {
        const [, sectionId] = destination.droppableId.split(",");
        const section = draft.sections.find((sec) => sec.id === sectionId);
        section?.rows?.push({
          children: [
            {
              id: uuid(),
              type: draggableId,
              options: {
                ...defaultOptions,
                field_id:
                  defaultOptions.name.replace(/[\W_]/g, "_") + "_" + nanoid(6),
              },
              validations: [],
            },
          ],
          id: uuid(),
          type: "single",
        });
        const row = last(section?.rows);
        const key = [sectionId, row?.id, "0", "settings"].toString();
        draft.selectedColumnForOptionDialog = key;
      });
    }),

  changeRowColumns: (sectionId, rowId, type) =>
    set((state) => {
      return produce(state, (draft) => {
        const section = draft.sections.find((sec) => sec.id === sectionId);
        const row = section?.rows.find((r) => r.id === rowId);
        const rowIndex =
          section?.rows.findIndex((r) => r.id === rowId) ??
          section?.rows.length;
        if (!row) return;
        const tempArray: (IRowChildren | null)[] = [];
        const foundBlueprint = defaultRowsBlueprint.find(
          (r) => r.type === type
        );
        foundBlueprint?.children.forEach((child, index) => {
          if (row.children[index]) {
            tempArray[index] = row.children[index];
          } else {
            tempArray[index] = child;
          }
        });

        if (row!.children.length > foundBlueprint!.children.length) {
          const remainingChild = [...row.children].slice(
            foundBlueprint!.children.length
          );

          const remainingNonEmptyChild = remainingChild.filter(Boolean);

          if (remainingNonEmptyChild.length > 0) {
            section?.rows.splice(rowIndex! + 1, 0, {
              children: remainingNonEmptyChild,
              id: uuid(),
              type: remainingNonEmptyChild.length > 1 ? "double" : "single",
            });
          }
        }

        row.type = type;
        row.children = tempArray;
      });
    }),

  moveInputBetweenSections: (source, destination) =>
    set((state) => {
      return produce(state, (draft) => {
        const [sourceSectionId, sourceRowId, sourceIndex] =
          source.droppableId.split(",");
        const [destinationSectionId, destinationRowId, destinationIndex] =
          destination.droppableId.split(",");

        const sourceSection = draft.sections.find(
          (s) => s.id === sourceSectionId
        );
        const destinationSection = draft.sections.find(
          (s) => s.id === destinationSectionId
        );

        const sourceRow = sourceSection?.rows.find((r) => r.id === sourceRowId);
        const destinationRow = destinationSection?.rows.find(
          (r) => r.id === destinationRowId
        );
        const rowSection = sourceRow?.children.splice(+sourceIndex, 1, null);
        if (!rowSection || !sourceRow) return;
        destinationRow?.children.splice(+destinationIndex, 1, rowSection[0]);
        // delete row if all sections are empty
        if (sourceRow.children.filter(Boolean).length === 0) {
          const rowIndex = sourceSection?.rows.findIndex(
            (r) => r.id === sourceRowId
          );
          sourceSection?.rows.splice(rowIndex!, 1);
        }
      });
    }),

  moveInputBetweenTableColumns: (source, destination) =>
    set((state) => {
      return produce(state, (draft) => {
        const sourceIndex = source.index;
        const destinationIndex = destination.index;
        const [sourceSectionId, sourceRowId] = source.droppableId.split(",");
        const [destinationSectionId, destinationRowId] =
          destination.droppableId.split(",");

        const sourceSection = draft.sections.find(
          (s) => s.id === sourceSectionId
        );
        const destinationSection = draft.sections.find(
          (s) => s.id === destinationSectionId
        );

        const sourceRow = sourceSection?.rows.find((r) => r.id === sourceRowId);
        const destinationRow = destinationSection?.rows.find(
          (r) => r.id === destinationRowId
        );
        const rowSection = sourceRow?.children.splice(+sourceIndex, 1);
        if (!rowSection || !sourceRow) return;
        destinationRow?.children.splice(+destinationIndex, 0, rowSection[0]);
      });
    }),

  moveInputToNewRow: (source, destination) =>
    set((state) => {
      return produce(state, (draft) => {
        const [, destinationSectionId] = destination.droppableId.split(",");
        const destinationSection = draft.sections.find(
          (sec) => sec.id === destinationSectionId
        );
        const [sourceSectionId, sourceRowId, sourceIndex] =
          source.droppableId.split(",");
        const sourceSection = draft.sections.find(
          (s) => s.id === sourceSectionId
        );
        const sourceRow = sourceSection?.rows.find((r) => r.id === sourceRowId);
        const rowSection = sourceRow?.children.splice(+sourceIndex, 1, null);

        if (!rowSection || !sourceRow) return;

        destinationSection?.rows?.push({
          children: [rowSection[0]],
          id: uuid(),
          type: "single",
        });

        // delete row if all sections are empty
        if (sourceRow.children.filter(Boolean).length === 0) {
          const rowIndex = sourceSection?.rows.findIndex(
            (r) => r.id === sourceRowId
          );
          sourceSection?.rows.splice(rowIndex!, 1);
        }
      });
    }),

  deleteRowColumn: (sectionId, rowId, columnIndex) =>
    set((state) => {
      return produce(state, (draft) => {
        const section = draft.sections.find((sec) => sec.id === sectionId);
        const row = section?.rows.find((r) => r.id === rowId);

        if (section?.type === "table") {
          row?.children.splice(+columnIndex, 1);
          draft.selectedColumnForOptionDialog = "";
        } else {
          row?.children.splice(+columnIndex, 1, null);
          draft.selectedColumnForOptionDialog = "";

          // delete row if all sections are empty
          if (row?.children.filter(Boolean).length === 0) {
            const rowIndex = section?.rows.findIndex((r) => r.id === rowId);
            section?.rows.splice(rowIndex!, 1);
          }
        }
      });
    }),

  changeInputOptionsValueGeneric: (optionId, value) =>
    set((state) => {
      return produce(state, (draft) => {
        const [sectionId, rowId, columnIndex] =
          draft.selectedColumnForOptionDialog.split(",");
        const section = draft.sections.find((sec) => sec.id === sectionId);
        const row = section?.rows.find((r) => r.id === rowId);
        (row?.children[+columnIndex] as any).options[optionId] = value;
      });
    }),

  changeInputTypeInRowColumn: (newType) =>
    set((state) => {
      return produce(state, (draft) => {
        const [sectionId, rowId, columnIndex] =
          draft.selectedColumnForOptionDialog.split(",");
        const section = draft.sections.find((sec) => sec.id === sectionId);
        const row = section?.rows.find((r) => r.id === rowId);
        (row?.children[+columnIndex] as any).type = newType;
        (row?.children[+columnIndex] as any).validations = [];
        (row?.children[+columnIndex] as any).options = {
          ...defaultOptions,
          field_id:
            defaultOptions.name.replace(/[\W_]/g, "_") + "_" + nanoid(6),
        };
      });
    }),

  addValidationRuleToInput: (validationType, defaultValue) =>
    set((state) => {
      return produce(state, (draft) => {
        const [sectionId, rowId, columnIndex] =
          draft.selectedColumnForOptionDialog.split(",");
        const section = draft.sections.find((sec) => sec.id === sectionId);
        const row = section?.rows.find((r) => r.id === rowId);
        row?.children[+columnIndex]?.validations.push({
          type: validationType,
          value: defaultValue,
        });
      });
    }),

  setInputValidationValue: (validationIndex, validation) =>
    set((state) => {
      return produce(state, (draft) => {
        const [sectionId, rowId, columnIndex] =
          draft.selectedColumnForOptionDialog.split(",");
        const section = draft.sections.find((sec) => sec.id === sectionId);
        const row = section?.rows.find((r) => r.id === rowId) as any;
        row.children[+columnIndex].validations[validationIndex].value =
          validation.value;
        row.children[+columnIndex].validations[validationIndex].errorMessage =
          validation.errorMessage;
      });
    }),

  deleteValidationRuleToInput: (validationIndex) =>
    set((state) => {
      return produce(state, (draft) => {
        const [sectionId, rowId, columnIndex] =
          draft.selectedColumnForOptionDialog.split(",");
        const section = draft.sections.find((sec) => sec.id === sectionId);
        const row = section?.rows.find((r) => r.id === rowId);
        row?.children?.[+columnIndex]?.validations.splice(validationIndex, 1);
      });
    }),
  checkError: () =>
    set((state) => {
      return produce(state, (draft) => {
        let errors: { [key: string]: string[] } = {};
        draft.sections.forEach((s) => {
          if (!!s.rows && s.rows.length) {
            s.rows.forEach((r) => {
              if (!!r.children && r.children.length) {
                r.children.forEach((c) => {
                  if (!!c) {
                    const childOption = _.find(
                      inputFieldsList,
                      _.matches({ id: c?.type })
                    )?.options;
                    const requiredFields = _.map(
                      _.filter(InputOptionsList, (k) => {
                        return _.includes(childOption, k.id) && k.isRequired;
                      }),
                      "keyFelidForOption"
                    );
                    requiredFields.forEach((f) => {
                      if (!_.has(c.options, f)) {
                        if (_.isArray(errors[c.id])) {
                          errors[c.id] = [...errors[c.id], f];
                        } else {
                          errors[c.id] = [f];
                        }
                      } else {
                        if (typeof c.options[f] === "number") {
                          if (!c.options[f]) {
                            if (_.isArray(errors[c.id])) {
                              errors[c.id] = [...errors[c.id], f];
                            } else {
                              errors[c.id] = [f];
                            }
                          }
                        } else if (_.isEmpty(c.options[f])) {
                          if (_.isArray(errors[c.id])) {
                            errors[c.id] = [...errors[c.id], f];
                          } else {
                            errors[c.id] = [f];
                          }
                        }
                      }
                    });
                  }
                });
              }
            });
          }
        });
        draft.errors = errors;
      });
    }),
  addError: (childId, fieldName) =>
    set((state) => {
      return produce(state, (draft) => {
        if (has(draft.errors, childId)) {
          if (draft.errors[childId]?.length) {
            if (!includes(draft.errors[childId], fieldName)) {
              draft.errors[childId] = [...draft.errors[childId], fieldName];
            }
          } else {
            draft.errors[childId] = [fieldName];
          }
        } else {
          draft.errors[childId] = [fieldName];
        }
      });
    }),
  removeError: (childId, fieldName) =>
    set((state) => {
      return produce(state, (draft) => {
        if (has(draft.errors, childId)) {
          draft.errors[childId] = reject(
            draft.errors[childId],
            (o) => o === fieldName
          );
          if (draft.errors[childId]?.length === 0) {
            delete draft.errors[childId];
          }
        }
      });
    }),
  checkValidationError: () =>
    set((state) => {
      return produce(state, (draft) => {
        let errors: { [key: string]: string[] } = {};
        draft.sections.forEach((s) => {
          if (!!s.rows && s.rows.length) {
            s.rows.forEach((r) => {
              if (!!r.children && r.children.length) {
                r.children.forEach((c) => {
                  if (!!c && c.validations.length) {
                    c.validations.forEach((v) => {
                      if (v.value !== null && !v.value) {
                        const err = [v.type, "value"].toString();
                        if (isArray(errors[c.id])) {
                          errors[c.id] = [...errors[c.id], err];
                        } else {
                          errors[c.id] = [err];
                        }
                      }

                      if (v.errorMessage !== undefined && !v.errorMessage) {
                        const err = [v.type, "errorMessage"].toString();
                        if (isArray(errors[c.id])) {
                          errors[c.id] = [...errors[c.id], err];
                        } else {
                          errors[c.id] = [err];
                        }
                      }
                    });
                  }
                });
              }
            });
          }
        });
        draft.validationErrors = errors;
      });
    }),
  addValidationError: (childId, errorName) =>
    set((state) => {
      return produce(state, (draft) => {
        if (has(draft.validationErrors, childId)) {
          if (draft.validationErrors[childId]?.length) {
            if (!includes(draft.validationErrors[childId], errorName)) {
              draft.validationErrors[childId] = [
                ...draft.validationErrors[childId],
                errorName,
              ];
            }
          } else {
            draft.validationErrors[childId] = [errorName];
          }
        } else {
          draft.validationErrors[childId] = [errorName];
        }
      });
    }),
  removeValidationError: (childId, errorName) =>
    set((state) => {
      return produce(state, (draft) => {
        if (has(draft.validationErrors, childId)) {
          draft.validationErrors[childId] = reject(
            draft.validationErrors[childId],
            (o) => o === errorName
          );
          if (draft.validationErrors[childId]?.length === 0) {
            delete draft.validationErrors[childId];
          }
        }
      });
    }),
}));
