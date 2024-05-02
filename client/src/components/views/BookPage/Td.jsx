import React, { useContext, useCallback, useMemo, memo } from 'react';
import { CREATE, READ, UPDATE, DELETE, TableContext } from './TableSetting';



const Td = memo(({ rowIndex, cellIndex}) => {
  const { tableData, dispatch } = useContext(TableContext);

  const onClickTd = useCallback(() => {
    
    console.log("click!!!!");
  }, []);

  return <RealTd onClickTd={onClickTd} data={tableData[rowIndex][cellIndex]} />;
});

const RealTd = memo(({ onClickTd, data}) => {

  return (
    <td
      onClick={onClickTd}
    >{data}</td>
  )
});

export default Td;
