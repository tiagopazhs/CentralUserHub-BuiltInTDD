import * as React from "react";
import { List, Datagrid, TextField } from "react-admin";

export const UserList: React.FC<{ data: any }> = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="email" />
            <TextField source="password" />
        </Datagrid>
    </List>
);
