class Input {
    set callback(value) {
        this._callback = value;
    }

    private input;
    private _callback = (text) => {
    };

    constructor(input, button, callback?) {
        this.input = input;
        this._callback = callback;
        button.onclick = () => this.event();
    }

    private event() {
        let text = this.input.value;
        this.input.value = '';
        this._callback(text);
    }
}

export default Input;