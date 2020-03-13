export type Role = 'admin' | 'warehouse' | 'delivery' | 'user';

export interface User {
    uid: string;
    email: string;
    displayName: string;
    role: Role;
    ID: number;
    phone: number;
    address: string;
    province: string;
    city: string;
}
