import React, { useEffect, useReducer, createContext, useMemo } from 'react';
import Table from './Table';

export const TableContext = createContext({
    tableData: [],
    dispatch: () => {},
  });

  const initialState = {
    tableData: []
  };
  
  const setData = (json) => {
    
    const data = [];
    return data;
  };

  export const CREATE = 'CREATE';
  export const READ = 'READ';
  export const PUT = 'UPDATE';
  export const DELETE = 'DELETE';
  

  const reducer = (state, action) => {
    switch (action.type) {
      case CREATE:
        return {
          ...state,
          tableData: setData(action.json)
        };
      case READ:
        return {
          ...state,
          tableData: setData(action.json)
        };
      default:
        return state;
    }
  };

  const TableSetting = (json) => {

    // json 변형
    



    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData } = state;
  
    const value = useMemo(() => ({ tableData, dispatch }), [tableData]);
    
    useEffect(() => {
        dispatch({ type: READ });
      }, []);
    
      return (
        <TableContext.Provider value={value}>
          <Table />
        </TableContext.Provider>
      );
  
  }


export default TableSetting;