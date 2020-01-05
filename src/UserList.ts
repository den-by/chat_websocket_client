class UserList {

    private userList: string[] = [];
    private select;

    constructor(select) {
        this.select = select;
        this.render();
    }

    public addUser(userName: string): void {
        this.userList.push(userName);
        this.render();
    }

    public deleteUser(userName: string): void {
        this.userList = this.userList.filter(value => value !== userName);
        this.render();
    }

    public resetUserList() {
        this.userList = [];
        this.render();
    }

    public loadUserList(userList: string[]) {
        this.userList = userList;
        this.render();
    }

    private render() {
        this.select.options.length = 0;
        this.userList.forEach((value, key) => {
            let option = new Option(value, key.toString());
            this.select.append(option)
        })
    }
}

export default UserList;