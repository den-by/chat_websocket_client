class LoginArea {

    set callback(value) {
        this._callback = value;
    }

    private input;
    private button;
    private _callback = (text) => {
    };

    constructor(input, button, callback?) {
        this.input = input;
        this.button = button;
        this._callback = callback;
        button.onclick = () => this.event();
    }

    private event() {
        let userName = this.input.value;
        this._callback(userName);
    }
}

export default LoginArea;