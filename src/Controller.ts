import UserList from "./UserList";
import ChatArea from "./ChatArea";
import Input from "./Input";
import LoginArea from "./LoginArea";
interface request {
    requestType: requestType;
    data?: {}
}

enum requestType {
    login = 0,
    say = 1,
    getUsers = 2,
    logOut = 3,
    getMessages = 4,
}

interface response {
    requestType: responseType;
    data?: {}
}

enum responseType {
    newMessage = 0,
    userConnected = 1,
    userDisconnected = 2,
    usersList = 3,
    messagesList = 4,
    serverKick = 5,
    loginSuccessfully = 6
}

class Controller {
    private userList: UserList;
    private chatArea: ChatArea;
    private input: Input;
    private socket: WebSocket;
    private loginArea: LoginArea;

    constructor() {
        this.socket = new WebSocket("ws://127.0.0.1:8080/article/websocket/demo/hello");
        this.userList = new UserList(document.getElementById('userList'));
        this.chatArea = new ChatArea(document.getElementById('textArea'));
        this.input = new Input(document.getElementById('input'), document.getElementById('button'));
        this.loginArea = new LoginArea(document.getElementById('userName'), document.getElementById('loginButton'));
        this.socket.onopen = this.connect;
        this.socket.onmessage = (event) => {
            this.onMessage(event.data);
        };
        this.loginArea.callback = (data) => this.say(data);
        this.input.callback = (data) => this.login(data);
    }

    public onMessage(data) {
        let a: response = JSON.parse(data);
        switch (+a.requestType) {
            case responseType.newMessage:
                this.chatArea.addRow(a.data['text']);
                break;
            case responseType.userConnected:
                this.userList.addUser(a.data['user']);
                break;
            case responseType.userDisconnected:
                this.userList.deleteUser(a.data['user']);
                break;
            case responseType.serverKick:
                break;
            case responseType.messagesList:
                this.chatArea.loadMessageList(a.data['messageList']);
                break;
            case responseType.usersList:
                this.userList.loadUserList(a.data['userList']);
                break;
            case responseType.loginSuccessfully:
                this.getMessages(10);
                this.getUsers();
                break;
            default:
                break;
        }
        // alert(`[message] Данные получены с сервера: ${data}`);
    }

    private connect = () => {
       // this.login('1');

        // alert("[open] Соединение установлено");
        // alert("Отправляем данные на сервер");
        // this.socket.send("Меня зовут Джон");
    };

    private login(name) {
        const data: request = {requestType: requestType.login, data: {name: name}};
        this.socket.send(JSON.stringify(data));
    }

    private getUsers() {
        const data: request = {requestType: requestType.getUsers};
        this.socket.send(JSON.stringify(data));
    }

    private getMessages(count) {
        const data: request = {requestType: requestType.getMessages, data: {count: count}};
        this.socket.send(JSON.stringify(data));
    }

    private say(text) {
        let data: request = {requestType: requestType.say, data: {text: text}};
        this.socket.send(JSON.stringify(data));
    }

    private logOut() {
        let data: request = {requestType: requestType.logOut};
        this.socket.send(JSON.stringify(data));
    }

}export default Controller;