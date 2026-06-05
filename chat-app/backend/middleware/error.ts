export class AppError extends Error{
    status:number;
    constructor(message:string,status:number){
        super(message);
        this.status=status;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}