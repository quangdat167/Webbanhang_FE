export default interface UserModel {
    _id?: string;
    username: string;
    password: string;
    email?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
