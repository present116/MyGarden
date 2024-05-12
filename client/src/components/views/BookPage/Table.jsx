import React, { useContext, memo } from 'react';
import Tr from './Tr';

import { TableContext } from './TableSetting';

const Table = memo(() => {
  const { tableData } = useContext(TableContext);

    
    return (
      <table>

        {tableData && tableData.map((d, i)=>
          <Tr data={d} />
        )}
      </table>
    )
  
  
});

export default Table;
