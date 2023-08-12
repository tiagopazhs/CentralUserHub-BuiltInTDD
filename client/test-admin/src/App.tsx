import { Admin, Resource } from "react-admin";
import jsonServerProvider from 'ra-data-json-server'

const dataProvider = jsonServerProvider('http://localhost:3001')

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users"/>
  </Admin>
);
