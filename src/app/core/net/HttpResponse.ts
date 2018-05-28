/* 参数验证错误接口 */
export interface IValidationErrorInfo {
    message: string;
    members: string[];
}
/* 错误信息接口 */
export interface IErrorInfo {
    code: number;
    msg: string;
    details: string[];
    validation_error_info: IValidationErrorInfo[];
}

/* 接口返回 */
export interface IHttpResponse<T> {
    target_url: string;
    error_info: IErrorInfo;
    result: T;
    is_authorized_request: boolean;
    is_success: boolean;
}

export interface IPagination<T> {
    item: T[];
    total_count: number;
    page_index: number;
}

/* 返回分页数据接口 */
export interface IPaginationResponse<T> extends IHttpResponse<IPagination<T>> {

}
