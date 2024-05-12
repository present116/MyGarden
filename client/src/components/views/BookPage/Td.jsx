import React, { useContext, useCallback, useMemo, memo } from 'react';
import { CREATE, READ, UPDATE, DELETE, TableContext } from './TableSetting';



const Td = memo(({ th, data}) => {
  const { tableData, dispatch } = useContext(TableContext);

  // const onClickTd = useCallback(() => {
    
  //   console.log("click!!!!");
  // }, []);
  console.log("th", th)
  console.log("data", data);

  return <RealTd th={th} data={data} />;
});

const RealTd = memo(({ th, data}) => {

  return (
    <div>
      <th>{th}</th>
      <td>{data}</td>
    </div>
  )
});

export default Td;
