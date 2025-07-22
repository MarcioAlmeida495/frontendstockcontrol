import { useForm } from "react-hook-form";
import { NewSelect } from "../NewSelect";
import styles from "./styles.module.css";

export const NewTab = () => {
  const { register, setValue } = useForm();
  return (
    <div>
      <NewSelect
        registerName={"client"}
        url={"clients/getclients"}
        register={register}
        setValue={setValue}
      />
    </div>
  );
};

export const OpenTabs = () => {
  return (
    <div className={styles.openTabs}>
      <NewTab />
      <NewTab />
      <NewTab />
      <NewTab />
      <NewTab />
      <NewTab />
      <NewTab />
      <NewTab />
      <NewTab />
    </div>
  );
};
