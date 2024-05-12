import React, { useContext, memo } from 'react';
import Tr from './Tr';

import { TableContext } from './TableSetting';

const Table = memo(() => {
  const { tableData } = useContext(TableContext);
  
  if(tableData !== undefined){
    return (
    <table>

      {tableData.forEach((d, i)=>{
        console.log('D@@@@@', d);
        <Tr data={d} />
      })}
    </table>
    )
  }
  return (
   <div>ㄴㅇㄹㄴㅇㄹㅇㄴㄹㄹㅇ</div> 
  )
});

export default Table;
