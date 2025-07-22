import { useEffect, useState } from "react";
import { NewSelect } from "../Components/NewSelect";
import { dataFetch } from "../utils/functions";
import { useForm } from "react-hook-form";

const urls = {
  getSuppliers: "supplier/getsuppliers",
  getItems: "items/getitems",
};

export const TestSupplierOrder = () => {
  const [selected, setSelected] = useState();
  const { register, setValue, getValues } = useForm();

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <>
      <button
        onClick={() => {
          console.log(getValues());
        }}
      >
        values
      </button>
      <NewSelect
        url={urls.getItems}
        registerName={"item_ID"}
        register={register}
        setValue={setValue}
        getSelected={(e) => setSelected(e)}
      ></NewSelect>
    </>
  );
};
