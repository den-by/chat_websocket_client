import UserList from "./UserList";
import ChatArea from "./ChatArea";
import Input from "./Input";
import LoginArea from "./LoginArea";
import Crypto from './Crypto'

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
    private crypto;
    private pass = 'test';
    private passInput;

    constructor() {
        this.crypto = new Crypto;
        this.socket = new WebSocket("ws://127.0.0.1:8080/article/websocket/demo/hello");
        this.userList = new UserList(document.getElementById('userList'));
        this.chatArea = new ChatArea(document.getElementById('textArea'));
        this.input = new Input(document.getElementById('input'), document.getElementById('button'));
        this.passInput = document.getElementById('passInput');
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
        switch (+response.responseType) {
            case responseType.newMessage:
                this.chatArea.addRow(response.data['text']);
                break;
            case responseType.messageList:
                this.chatArea.loadMessageList(response.data['messageList']);
                break;
            case responseType.userList:
                this.userList.loadUserList(response.data['userList']);
                break;
            default:
                break;
        }
    }

    private connect = () => {

    };

    private send(data) {
        const jsonData = JSON.stringify(data);
        const cryptoData = Crypto.encryptRC2(jsonData, this.passInput.value || '-');
        const decryptData = Crypto.decryptRC2(cryptoData, this.pass);
        this.socket.send(cryptoData);
    }

    private login(name) {
        const data: request = {requestType: requestType.login, data: {name: name}};
        this.send(data);
    }


    private say(message) {
        let data: request = {requestType: requestType.say, data: {message: message}};
        this.send(data);
    }

}

export default Controller;