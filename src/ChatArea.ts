class ChatArea {

    private messagesArray: string[] = [];
    private textArea;

    constructor(textArea) {
        this.textArea = textArea;
        this.render();
    }

    public addRow(row: string): void {
        this.messagesArray.push(row);
        this.render();
    }

    public loadMessageList(messagesArray: string[]): void {
        this.messagesArray = messagesArray;
        this.render();
    }

    private render(): void {
        this.textArea.value = this.messagesArray.join('\n');
    }
}

export default ChatArea;