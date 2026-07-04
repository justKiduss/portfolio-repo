class AppError extends Error {
    constructor(msg,status){
            super(msg);
            this.status=status;
            this.success=false;
            Error.captureStackTrace(this,this.constructor);
    }
}