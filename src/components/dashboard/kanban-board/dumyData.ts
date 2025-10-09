import type { KanbanState } from "./types";


export const DefaultKanbanData: KanbanState = {
    columns: [
        {
            id: 'todo',
            name: 'Todo',
            tasks: [
                {
                    id: 'task-1',
                    title: 'Design login page',
                    description: 'Create a responsive login page with email and password fields.',
                },
                {
                    id: 'task-2',
                    title: 'Set up project structure',
                    description: 'Initialize TypeScript project and create folder layout.',
                },
            ],
        },
        {
            id: 'in-progress',
            name: 'In Progress',
            tasks: [
                {
                    id: 'task-3',
                    title: 'Implement localStorage logic',
                    description: 'Write utility functions to load and save board state.',
                },
            ],
        },
        {
            id: 'in-review',
            name: 'In Review',
            tasks: [
                {
                    id: 'task-4',
                    title: 'Refactor Column component',
                    description: 'Improve readability and extract reusable task logic.',
                },
            ],
        },
        {
            id: 'done',
            name: 'Done',
            tasks: [
                {
                    id: 'task-5',
                    title: 'Create TaskCard component',
                    description: 'Display task title and description with edit/delete buttons.',
                },
            ],
        },
    ],
};
