import Providers from "./global/providers.comp";
import {Route, Switch} from "react-router-dom";
import Root from "./pages/root";
import NotFound from "./pages/not-found";
import React from "react";


export default function App(){
  return(
    <Providers>
      <Switch>
        <Route exact path="/" component={Root}/>
        <Route component={NotFound}/>
      </Switch>
    </Providers>
  )
}