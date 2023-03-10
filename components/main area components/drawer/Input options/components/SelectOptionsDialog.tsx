import { Modal, Input } from "antd";
import { CheckSuccessIcon, PlusIcon } from "components/icons.list";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isEmpty, range } from "lodash";
import { FC, useState } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

const { Search } = Input;

const schema = yup.object().shape({
  title: yup.string(),
});

interface ISelectOptionsDialog {
  open: boolean;
  onClose: () => void;
  value: any;
  setValue: (str: any) => any;
}

interface TableCellProps {
  value: string;
  type: "add" | "edit";
  onSuccess: () => void;
  parentId: number;
  id?: number;
}

interface MainList {
  id: number;
  text: string;
}

interface ListInputProps {
  onSuccess: () => void;
}

interface ListPostData {
  text: string;
}

const SelectOptionsDialog: FC<ISelectOptionsDialog> = ({
  open,
  onClose,
  value,
  setValue,
}) => {
  const [addListItem, setAddListItem] = useState(false);

  const { data: list = [], refetch } = useQuery(
    ["all_list"],
    () => axios.get(`/list`),
    {
      select: (res) => {
        return res.data.data;
      },
      enabled: open,
    }
  );

  const { data: options = [], refetch: refetchOptions } = useQuery(
    ["list_options", value],
    () => axios.get(`/list_option/${value}`),
    {
      select: (res) => {
        return res.data.data;
      },
      enabled: open && !!value,
    }
  );

  const onSuccessfullyAdd = () => {
    refetch();
    setAddListItem(false);
  };

  return (
    <Modal
      centered
      title="Select a list"
      width="800px"
      footer={null}
      visible={open}
      onCancel={onClose}
    >
      <div className="w-full flex flex-wrap h-96">
        <div className="w-6/12">
          <div className="flex items-center justify-between mb-5">
            <p className="text-base text-gray-600 mb-0 font-bold">List names</p>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setAddListItem(true)}
            >
              <PlusIcon />
              <p className="text-base text-blue-900 pl-1 mb-0 font-bold">
                List names
              </p>
            </div>
          </div>
          <div className="w-full mb-5">
            <Search placeholder="search" className="w-full" />
          </div>
          {addListItem && (
            <div className="w-full mb-5">
              <ListInput onSuccess={onSuccessfullyAdd} />
            </div>
          )}
          <div className="flex-1 overflow-y-auto">
            {list.map((val: MainList) => (
              <div
                key={val.id}
                onClick={() => setValue(val.id)}
                className={` ${
                  value === val.id && "bg-blue-100"
                } w-full h-10 flex items-center justify-between px-4 rounded-sm mb-2 cursor-pointer`}
              >
                <p className="text-base text-gray-600 font-medium mb-0">
                  {val.text}
                </p>
                {value === val.id && <CheckSuccessIcon />}
              </div>
            ))}
          </div>
        </div>
        <div className="w-6/12 h-full px-6 overflow-y-auto">
          <div className="w-full flex h-10 bg-blue-100">
            <div className="w-12 border border-gray-300" />
            <div className="flex-1 px-3 flex items-center border border-l-0 border-gray-300">
              <span className="text-base font-bold text-gray-600">
                List of items
              </span>
            </div>
          </div>
          {options?.map((val: MainList) => (
            <div className="w-full flex h-10" key={val.id}>
              <div className="w-12 border-t-0 border border-gray-300 flex items-center justify-center bg-blue-100">
                <span className="text-sm font-medium text-gray-500">
                  {val.id}
                </span>
              </div>
              <div className="flex-1 border-t-0 border-l-0 border border-gray-300">
                <TableInput
                  value={val.text}
                  type="edit"
                  id={val.id}
                  onSuccess={refetchOptions}
                  parentId={value}
                />
              </div>
            </div>
          ))}
          {range(250 - options?.length).map((val) => (
            <div className="w-full flex h-10" key={val}>
              <div className="w-12 border-t-0 border border-gray-300 flex items-center justify-center bg-blue-100">
                <span className="text-sm font-medium text-gray-500">
                  {val + options?.length + 1}
                </span>
              </div>
              <div className="flex-1 border-t-0 border-l-0 border border-gray-300">
                <TableInput
                  value=""
                  type="add"
                  onSuccess={refetchOptions}
                  parentId={value}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="-mx-6 px-5 pt-5 border-t border-gray-200 flex items-center justify-end">
        <button
          className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-8 rounded mx-3"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-8 rounded"
          onClick={onClose}
        >
          Apply
        </button>
      </div>
    </Modal>
  );
};

export default SelectOptionsDialog;

const ListInput: FC<ListInputProps> = ({ onSuccess }) => {
  const { control, handleSubmit, reset } = useForm<ListPostData>({
    mode: "onChange",
    defaultValues: {
      text: "",
    },
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation(
    (data: ListPostData) => axios.post(`/list`, data),
    {
      onSuccess: async (res: any) => {
        if (res.data.success) {
          onSuccess();
          reset({ text: "" });
        }
      },
    }
  );

  function onSubmit(model: ListPostData) {
    mutate(model);
  }

  return (
    <form
      className="flex w-full items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="text"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            className="rounded w-full py-2 px-3 border-2 border-gray-400 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline focus:border-blue-400"
            type="text"
            placeholder="Enter a list Title"
          />
        )}
      />
    </form>
  );
};

const TableInput: FC<TableCellProps> = ({
  value,
  onSuccess,
  type,
  parentId,
  id,
}) => {
  const { control, handleSubmit } = useForm<ListPostData>({
    mode: "onChange",
    defaultValues: {
      text: value,
    },
    resolver: yupResolver(schema),
  });

  const { mutate: mutateAdd } = useMutation(
    (data: ListPostData) => axios.post(`/list_option/${parentId}`, data),
    {
      onSuccess: async (res: any) => {
        if (res.data.success) {
          onSuccess();
        }
      },
    }
  );

  const { mutate: mutateSave } = useMutation(
    (data: ListPostData) => axios.put(`/list_option/${parentId}/${id}`, data),
    {
      onSuccess: async (res: any) => {
        if (res.data.success) {
          onSuccess();
        }
      },
    }
  );

  function onSubmit(model: ListPostData) {
    if (type === "add" && isEmpty(model.text)) {
      return;
    }
    if (type === "add") {
      mutateAdd(model);
    } else if (type === "edit") {
      mutateSave(model);
    }
  }

  return (
    <form
      className="flex w-full items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
      onBlur={handleSubmit(onSubmit)}
    >
      <Controller
        name="text"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-2 focus:border-blue-400"
            type="text"
          />
        )}
      />
    </form>
  );
};
