import './App.css';
import { Admin, Resource } from "react-admin";
import jsonServerProvider from 'ra-data-json-server'
import { UserCreate, UserEdit, UserList } from "./users/users";

const dataProvider = jsonServerProvider('http://localhost:3001')

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate}/>
  </Admin>
);

export default App;
