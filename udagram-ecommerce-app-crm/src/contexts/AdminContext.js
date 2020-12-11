import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminContextProvider = props=>{
    const [adminId, setAdminId] = useState(null);

    return(
        <AdminContext.Provider value={[adminId, setAdminId]}>
            {props.children}
        </AdminContext.Provider>
    );
}