export class User  {
    email: string;
    name: string;
    private dbName = 'userDB';

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

    saveToDatabase() {
        console.log(`Saving to database ${this.dbName}`, this.getUserInfo())
    }
}


const user = new User("John","John@yahoo.com");

console.log(user.saveToDatabase());
