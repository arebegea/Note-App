export interface NoteType extends NewNoteType{
    timestamp?: number;
}

export interface NewNoteType{
    title: string;
    body: string;
    important: boolean;
    color: string;
}