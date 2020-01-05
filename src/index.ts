// interface Props {
//     world: string;
// }
//
// function hello(props: Props): void {
//     alert(`Hello, ${props.world}`);
// }

//let a = hello({ world: 'TypeScript!' });

import watcher from "./Watcher";
import Client from "./Client";
import UserList from "./UserList";

let userList = new UserList(document.getElementById('userList'));
userList.addUser('Вася');
userList.addUser('Вася2');
userList.addUser('Коля');
userList.deleteUser('Вася');
//let client = new Client('3');
//watcher.Watcher.add(document.body);

import {obj} from './test';
//alert(obj.a);