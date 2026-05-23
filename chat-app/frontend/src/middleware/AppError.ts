export class AppError extends Error{
    status:number;
    constructor(message:string,status:number){
        super(message);
        this.status=status;

        Object.setPrototypeOf(this, AppError.prototype);

        const captureStackTrace = (Error as ErrorConstructor & {
            captureStackTrace?: (
                targetObject: object,
                constructorOpt?: Function
            ) => void;
        }).captureStackTrace;

        captureStackTrace?.(this, this.constructor);

    }
}