class UserList {

    private userList: string[] = [];
    private select;

    constructor(select) {
        this.select = select;
        this.render();
    }

    public loadUserList(userList: string[]): void {
        this.userList = userList;
        this.render();
    }

    private render(): void {
        this.select.options.length = 0;
        this.userList.forEach((value, key) => {
            let option = new Option(value, key.toString());
            this.select.append(option)
        })
    }
}

export default UserList;