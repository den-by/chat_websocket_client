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
let chatArea = new ChatArea(document.getElementById('textArea'));
userList.addUser('Вася');
userList.addUser('Вася2');
userList.addUser('Коля');
userList.deleteUser('Вася');
chatArea.addRow('test');
chatArea.addRow('test');
chatArea.addRow('test');
//let client = new Client('3');
//watcher.Watcher.add(document.body);

import {obj} from './test';
import ChatArea from "./ChatArea";
//alert(obj.a);