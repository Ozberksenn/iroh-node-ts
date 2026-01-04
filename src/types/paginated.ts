export interface PaginatedResponse<T> {
    items: T[];
    page: number;
    size: number;
    totalPages: number;
    totalSize: number;
}