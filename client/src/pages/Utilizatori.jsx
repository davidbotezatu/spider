import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Edit,
  Inject,
  Search,
  Toolbar,
  Selection,
  Filter,
} from "@syncfusion/ej2-react-grids";

import { employeesData, employeesGrid } from "../data/dummy";
import { Header } from "../components";

const Utilizatori = () => {
  return (
    <div className="m-2 rounded-3xl bg-white p-2 md:m-10 md:p-10">
      <Header title="Utilizatori" category="Page" />

      <GridComponent
        dataSource={employeesData}
        allowPaging
        allowSorting
        toolbar={["Search", "Delete"]}
        editSettings={{ allowEditing: true }}
        width="auto"
      >
        <ColumnsDirective>
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>

        <Inject
          services={[Sort, Page, Edit, Search, Toolbar, Selection, Filter]}
        />
      </GridComponent>
    </div>
  );
};
export default Utilizatori;
