export class Alert {
    id: string;
    type: AlertType;
    message: string;
    autoClose?: boolean; // Marked as optional
    keepAfterRouteChange?: boolean; // Marked as optional
    fade?: boolean; // Marked as optional

    constructor(init?: Partial<Alert>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}