import { type SweetAlertOptions, type SweetAlertResult } from 'sweetalert2';

export interface SwalInstance {
    fire: (options: SweetAlertOptions) => Promise<any>;
    close(result?: Partial<SweetAlertResult>): void
}