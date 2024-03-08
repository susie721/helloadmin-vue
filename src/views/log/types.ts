
export interface Item {
    email: string,
    ip: string
}
export interface ApiParams {
    email?: string,
    ip?: string,
    page: number,
    size: number
}
export interface PaginationProp {
    page: number,
    size: number,
    count: number
}

export interface Response {
    code?: number
    items: Item[],
    pagination?: PaginationProp
    message?: string
}
export module API {
    // 登录日志列表
    export type _LoginLogList = (params: ApiParams) => Promise<Response>
}
