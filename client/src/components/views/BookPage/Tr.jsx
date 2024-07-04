import React, { memo } from "react";
import Td from "./Td";

const Tr = memo(({ data }) => {
  return (
    <tr>
      {Object.keys(data).map((d, index) => (
        <Td key={index} th={d} data={data[d]} />
      ))}
    </tr>
  );
});

export default Tr;
