"use client"

import { PersistGate } from "redux-persist/integration/react";
// import store, { persistor } from "./store"
// import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";



export function PersistGateways({children}) {

    return <PersistGate loading={null} persistor={persistor}>
    {children}
  </PersistGate>

}