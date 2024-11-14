import React, { createContext, useContext, useState } from 'react';

export const DashboardContext = createContext(null); // Define el contexto sin tipo

export function useUserContext() {
    const user = useContext(DashboardContext);

    if (user === undefined) {
        throw new Error('useUserContext must be used with a DashboardContext');
    }

    return user;
}