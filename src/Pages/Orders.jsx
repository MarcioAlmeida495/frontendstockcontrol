import { DinamicTable } from "../Components/DinamicTable";
import { Div } from "../Styles/styledDiv";

export const Orders = () => {
  return (
    <Div width={"700px"}>
      <DinamicTable
        object={{ nome: "", telefone: "", email: "" }}
        defaultData={[]}
        crudUrls={{
          c: "supplier/addsupplier",
          r: "order/getorders",
          u: "supplier/updatesupplier",
          d: "supplier/deletesupplier",
        }}
        allowEdit={true}
      />
    </Div>
  );
};
