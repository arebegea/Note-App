export interface NoteType extends FormNoteType{
    timestamp?: number;
    noteId?: string;
}

export interface FormNoteType{
    title: string;
    body: string;
    important: boolean;
    color: string;
}