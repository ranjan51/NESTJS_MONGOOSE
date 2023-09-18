interface AppResponse {
    code: number;
    msg: string;
    data?: any
}
const createResponse = (code: number, msg: string, data?: any): AppResponse => {
    return {
        code,
        msg,
        data
    }
}

export { createResponse, AppResponse };