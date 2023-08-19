import * as React from "react";
import { List, Datagrid, TextField, SimpleForm, Edit, TextInput, PasswordInput, Create } from "react-admin";

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

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" />
            <PasswordInput source="password" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" />
            <PasswordInput source="password" />
        </SimpleForm>
    </Create>
);
