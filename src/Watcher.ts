class Watcher {
    public static chat;
    public static input;
    public static send;
    public static users;
    public static add(root) {
        debugger
        root.onclick = this.click;
    }

    private static click(event) {
        let curElement = event.target;
        debugger
        alert('test');
    }
}

export default {Watcher};