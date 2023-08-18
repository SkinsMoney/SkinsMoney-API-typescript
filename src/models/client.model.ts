export interface ClientResponse<T> {
    success: boolean;
    type: string;
    data: T;
}