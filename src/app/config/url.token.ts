import { InjectionToken } from "@angular/core";

export interface apiUrlConfig {
    url: string;
}

export const apiUrl = new InjectionToken<apiUrlConfig>('apiUrl');