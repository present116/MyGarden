import React, { useEffect, useReducer, createContext, useMemo } from "react";
import Table from "./Table";

export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
});

const initialState = {
  tableData: [],
};

function initialStateSetting(d) {
  initialState.tableData = d;
}

const setData = (json) => {
  initialState.tableData = json;
};

export const CREATE = "CREATE";
export const READ = "READ";
export const PUT = "UPDATE";
export const DELETE = "DELETE";

const reducer = (state, action) => {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
        tableData: setData(action.json),
      };
    case READ:
      return {
        ...state,
        tableData: setData(action.json),
      };
    default:
      return {
        ...state,
        tableData: setData(action.json),
      };
  }
};

const TableSetting = (data) => {
  // console.log(data);
  initialStateSetting(data.json.items);

  const [state, dispatch] = useReducer(reducer, initialState); // state 제대로 안나옴
  const { tableData } = initialState; // 원래 state
  const value = useMemo(() => ({ tableData, dispatch }), [tableData]);

  useEffect(() => {
    dispatch({ type: READ });
  }, []);

  return (
    <TableContext.Provider value={value}>
      <Table />
    </TableContext.Provider>
  );
};

export default TableSetting;
