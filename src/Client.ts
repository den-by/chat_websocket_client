class Client {
    private socket: WebSocket;

    constructor(address) {
        this.socket = new WebSocket("ws://127.0.0.1:8080/article/websocket/demo/hello");
        this.socket.onopen = this.connect;
        this.socket.onmessage = (event) => {
            this.onMessage1(event.data);
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

    public send(data: string): void {
        this.socket.send(data);
    }

    private onMessage1(data) {
        alert(`[message] Данные получены с сервера: ${data}`);
    }

}

export default Client;