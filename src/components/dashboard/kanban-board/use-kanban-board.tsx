import { useState } from "react";
import type { KanbanState, Column, Task } from "./types";
import { DefaultKanbanData } from "./dumyData";
import { useLocalStorage } from "../../../hooks/localStorage/use-local-storage";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export const useKanbanBoard = (storageKey: string = "kanban_data") => {
    const { state, resetState, setField } = useLocalStorage<KanbanState>(
        storageKey,
        DefaultKanbanData
    );


    const columns = state.columns;
    const [isAddingColumn, setIsAddingColumn] = useState(false);
    const [newColumnName, setNewColumnName] = useState("");
    const [activeTask, setActiveTask] = useState<Task | null>(null);

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

    const handleDragStart = ({ active }: DragStartEvent) => {
        const taskId = active.id;

        const task = state.columns
            .flatMap(col => col.tasks)
            .find(task => task.id === taskId);

        if (task) {
            setActiveTask(task);
        }
    };


    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over || active.id === over.id) {
            setActiveTask(null);
            return;
        }


        const activeId = active.id;
        const overId = over.id;

        const sourceColumn = state.columns.find(col =>
            col.tasks.some(task => task.id === activeId)
        );

        const targetColumn = state.columns.find(col =>
            col.tasks.some(task => task.id === overId) || col.id === overId
        );

        if (!sourceColumn || !targetColumn) return;

        const activeTaskIndex = sourceColumn.tasks.findIndex(task => task.id === activeId);
        const targetTaskIndex = targetColumn.tasks.findIndex(task => task.id === overId);
        const activeTask = sourceColumn.tasks[activeTaskIndex];

        const isSameColumn = sourceColumn.id === targetColumn.id;

        // Prevent deletion if dropped in same column and same index
        if (isSameColumn && activeTaskIndex === targetTaskIndex) return;

        const updatedColumns = state.columns.map(col => {
            if (col.id === sourceColumn.id && isSameColumn) {
                // Reorder within same column using arrayMove
                return {
                    ...col,
                    tasks: arrayMove(col.tasks, activeTaskIndex, targetTaskIndex),
                };
            }

            if (col.id === sourceColumn.id) {
                // Remove from source column
                return {
                    ...col,
                    tasks: col.tasks.filter(task => task.id !== activeId),
                };
            }

            if (col.id === targetColumn.id && activeTask) {
                // Insert into target column
                const newTasks = [...col.tasks];
                const insertIndex = targetTaskIndex >= 0 ? targetTaskIndex : col.tasks.length;
                newTasks.splice(insertIndex, 0, activeTask);
                return {
                    ...col,
                    tasks: newTasks,
                };
            }

            return col;
        });

        setField('columns', updatedColumns);
        setActiveTask(null);

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
        handleDragEnd,
        handleDragStart,
        activeTask
    };
};