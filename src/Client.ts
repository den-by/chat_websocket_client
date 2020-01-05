interface request {
    requestType: requestType;
    data?: {}
}

enum requestType {
    login = 0,
    say = 1,
    getUsers = 2,
    disconnect = 3,
}

interface response {
    requestType: responseType;
    data?: {}
}

enum responseType {
    userSays = 0,
    userConnected = 1,
    userDisconnected = 2,
    usersList = 3,
    messagesList = 4,
    serverKick = 5
}

class Client {
    private socket: WebSocket;
    private userList;
    private input;
    private ;


    constructor(address) {
        this.socket = new WebSocket("ws://127.0.0.1:8080/article/websocket/demo/hello");
        this.socket.onopen = this.connect;
        this.socket.onmessage = (event) => {
            this.onMessage(event.data);
        };
        this.socket.onclose = function (event) {
            if (event.wasClean) {
                alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
            } else {
                // например, сервер убил процесс или сеть недоступна
                // обычно в этом случае event.code 1006
                alert('[close] Соединение прервано');
            }
        };
    }

    private connect = () => {
        alert("[open] Соединение установлено");
        alert("Отправляем данные на сервер");
        this.socket.send("Меня зовут Джон");
    };

    public login(name: string) {
        let a: requestType = requestType.login;
        let b: request = {requestType: a, data: {'name': name}};
        this.send(JSON.stringify(b));
    }

    public say(message) {
       // let me: request = {requestType, []};
    }

    public send(data: string): void {
        this.socket.send(data);
    }

    private onMessage(data) {
        let a: response = JSON.parse(data);
        switch (+a.requestType) {
            case responseType.userSays:

                break;
            case responseType.userConnected:
                break;
            case responseType.userDisconnected:
                break;
            case responseType.serverKick:
                break;
            case responseType.messagesList:
                break;
            case responseType.usersList:
                break;
            default:
                break;
        }
        alert(`[message] Данные получены с сервера: ${data}`);
    }

}

export default Client;