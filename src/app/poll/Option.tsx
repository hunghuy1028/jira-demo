export interface Option {
    Id: string;
    Value: string;
    Mode: "edit" | "done";
    Count: number;
    ShowEdit: boolean;
}