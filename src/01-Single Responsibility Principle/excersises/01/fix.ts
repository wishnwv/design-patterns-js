export class User  {
    email: string;
    name: string;

    constructor(name:string,email:string){
        this.name = name;
        this.email = email;
    }

    getUserInfo() {
        return {
            name: this.name,
            email: this.email
        }
    }


}


export class Database {
    private table;
    private dbName = 'userDB'

    constructor(table:string){
        this.table = table;
    }

    saveToDatabase(data:any) {
        console.log(`Saving to database ${this.dbName} -> ${this.table}`, data)
    }
}

const user = new User("doe", "doe@yahoo.com");

const userInfo = user.getUserInfo();

const db = new Database("user-info");
db.saveToDatabase(userInfo);

