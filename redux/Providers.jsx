"use client"

import { Provider } from "react-redux"
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";
import store, { persistor } from "./store";

export function Providers({children}) {



    return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>

}