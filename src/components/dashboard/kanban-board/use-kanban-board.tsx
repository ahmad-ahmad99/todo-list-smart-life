import { useState } from "react";
import type { KanbanState, Column, Task } from "./types";
import { DefaultKanbanData } from "./dumyData";
import { useLocalStorage } from "../../../hooks/localStorage/use-local-storage";

export const useKanbanBoard = (storageKey: string = "kanban_data") => {
    const { state, setState, resetState, setField } = useLocalStorage<KanbanState>(
        storageKey,
        DefaultKanbanData
    );

    const columns = state.columns;
    const [isAddingColumn, setIsAddingColumn] = useState(false);
    const [newColumnName, setNewColumnName] = useState("");

    const addColumn = () => {
        if (newColumnName.trim()) {
            const newColumn: Column = {
                id: Date.now().toString(),
                name: newColumnName,
                tasks: [],
            };
            setField("columns", [...columns, newColumn]);
            setNewColumnName("");
            setIsAddingColumn(false);
        }
    };

    const addTask = (columnId: string, task: Task) => {
        if (task.title) {
            const updatedColumns = columns.map(col =>
                col.id === columnId
                    ? {
                        ...col,
                        tasks: [
                            ...col.tasks,
                            {
                                id: Date.now().toString(),
                                title: task.title,
                                description: task.description || "",
                            },
                        ],
                    }
                    : col
            );
            setField("columns", updatedColumns);
        }
    };

    const editTask = (columnId: string, updated: Task) => {
        const updatedColumns = columns.map(col =>
            col.id === columnId
                ? {
                    ...col,
                    tasks: col.tasks.map(t => (t.id === updated.id ? updated : t)),
                }
                : col
        );
        setField("columns", updatedColumns);
    };

    const deleteTask = (columnId: string, taskId: string) => {
        const updatedColumns = columns.map(col =>
            col.id === columnId
                ? {
                    ...col,
                    tasks: col.tasks.filter(t => t.id !== taskId),
                }
                : col
        );
        setField("columns", updatedColumns);
    };

    return {
        columns,
        isAddingColumn,
        setIsAddingColumn,
        newColumnName,
        setNewColumnName,
        addColumn,
        addTask,
        editTask,
        deleteTask,
        resetState,
    };
};