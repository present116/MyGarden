import React, { useContext, memo } from "react";
import Tr from "./Tr";
import { TableContext } from "./TableSetting";

const Table = memo(() => {
  const { tableData } = useContext(TableContext);

  return (
    <table>
      <tbody>
        {tableData && tableData.map((d, i) => <Tr key={i} data={d} />)}
      </tbody>
    </table>
  );
});

export default Table;
