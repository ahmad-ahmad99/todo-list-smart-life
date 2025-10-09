export type Task = {
    id: string;
    title: string;
    description: string;
};

export type Column = {
    id: string;
    name: string;
    tasks: Task[];
};

export type KanbanState = {
    columns: Column[];
};

