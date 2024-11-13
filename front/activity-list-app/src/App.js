import "./App.css";
import Activity from "./pages/activities/Activity";
import { Switch, Route } from "react-router-dom";
import Client from "./pages/clients/Client";
import Dashboard from "./pages/home/Dashboard";
import ClientForm from "./pages/clients/ClientForm";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/clients" component={Client} />
      <Route path="/client/detail/:id?" component={ClientForm} />
      <Route path="/activities" component={Activity} />
      <Route component={PageNotFound} />
    </Switch>
  );
}
