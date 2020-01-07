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
    responseType: responseType;
    data?: {}
}

enum responseType {
    newMessage = 0,
    userConnected = 1,
    userDisconnected = 2,
    userList = 3,
    messageList = 4,
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
        this.loginArea.callback = (data) => this.login(data);
        this.input.callback = (data) => this.say(data);
    }

    public onMessage(data): void {
        let response: response;
        try {
            response = JSON.parse(data);
        } catch (e) {
            return;
        }
        debugger
        switch (+response.responseType) {
            case responseType.newMessage:
                this.chatArea.addRow(response.data['text']);
                break;
            case responseType.userConnected:
                this.userList.addUser(response.data['user']);
                break;
            case responseType.userDisconnected:
                this.userList.deleteUser(response.data['user']);
                break;
            case responseType.serverKick:
                break;
            case responseType.messageList:
                this.chatArea.loadMessageList(response.data['messageList']);
                break;
            case responseType.userList:
                debugger
                this.userList.loadUserList(response.data['userList']);
                break;
            case responseType.loginSuccessfully:
                //this.getMessages(10);
                //this.getUsers();
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

    private say(message) {
        let data: request = {requestType: requestType.say, data: {message: message}};
        this.socket.send(JSON.stringify(data));
    }

    private logOut() {
        let data: request = {requestType: requestType.logOut};
        this.socket.send(JSON.stringify(data));
    }

}

export default Controller;