import React, { memo } from 'react';
import Td from './Td';

const Tr = memo(({ data }) => {
  console.log('dfsdfsdfsdf');
  return (
    <tr>
      여기 안들어와??
      {Object.keys(data).forEach((d)=>{
        console.log("d~~~", d);
        <Td th={d} data={data[d]}></Td>
      })}
    </tr>
  )
});

export default Tr;
