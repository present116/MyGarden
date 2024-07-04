import React, { useContext, memo } from "react";
import { TableContext } from "./TableSetting";

const Td = memo(({ th, data }) => {
  const { tableData, dispatch } = useContext(TableContext);

  return (
    <div>
      <td>{th}</td>
      <td>{data}</td>
    </div>
  );
});

export default Td;
