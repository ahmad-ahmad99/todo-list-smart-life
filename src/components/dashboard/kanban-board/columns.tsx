import React, { useState } from "react";
import { TaskCard } from "./task-card";
import type { Column, Task } from "./types";
import { Box, Button, TextField, Typography } from "@mui/material";
import { ActionButtons } from "./action-buttons";
import { useTranslate } from "../../../locales";
import { CONFIG } from "../../../global-config";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

type Props = {
    column: Column;
    onAddTask: (columnId: string, task: Task) => void;
    onEditTask: (columnId: string, task: Task) => void;
    onDeleteTask: (columnId: string, taskId: string) => void;
    activeTask?: Task | null

};

export const ColumnView: React.FC<Props> = ({
    column,
    onAddTask,
    onEditTask,
    onDeleteTask,
    activeTask
}) => {
    const { t } = useTranslate()
    const [isAdding, setIsAdding] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const { setNodeRef } = useDroppable({ id: column.id });

    const handleSubmit = () => {
        if (newTitle.trim()) {
            const newTask: Task = {
                id: Date.now().toString(),
                title: newTitle,
                description: newDescription,
            };
            onAddTask(column.id, newTask);
            setNewTitle("");
            setNewDescription("");
            setIsAdding(false);
        }
    };

    return (
        <Box
            ref={setNodeRef}
            sx={{
                minWidth: "300px",
                flexShrink: 0,
                boxSizing: "border-box",
                position: 'relative',
                display: "flex",
                flexDirection: 'column',
                gap: 1,
                p: 1,
                pb: 2,
                pt: 3,
                borderRadius: 2,
                backgroundColor: "#F6F7F9",
                height: 'fit-content'
            }}>
            <Typography sx={{ fontSmooth: '18px', px: 1, mb: 1, fontFamily: "ExpoArabicBold", color: "#4D637C" }}>{column.name} <span style={{ color: "#374555" }}>{`(${column.tasks.length})`}</span></Typography>
            <SortableContext
                items={column.tasks.map(task => task.id)}
                strategy={verticalListSortingStrategy}
            >

                {column.tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={(task) => onEditTask(column.id, task)}
                        onDelete={(id) => onDeleteTask(column.id, id)}
                        isDragging={task.id === activeTask?.id}
                    />
                ))}
                {column.tasks.length === 0 && (
                    <Typography sx={{ fontSmooth: '18px', px: 1, mb: 1, fontFamily: "ExpoArabicLight", color: "#4D637C" }}>
                        {t('noTask')}
                    </Typography>

                )}
            </SortableContext>

            {isAdding ? (
                <div style={{ border: "1px solid #ccc", padding: "8px", marginBottom: "8px", borderRadius: "4px" }}>
                    <TextField
                        placeholder={t('title')}
                        label={t('title')}
                        variant="outlined"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        style={{ marginBottom: "8px" }}
                        size="small"
                        fullWidth
                    />
                    <TextField
                        placeholder={t('description')}
                        label={t('description')}
                        variant="outlined"

                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        style={{ marginBottom: "8px" }}
                        size="small"
                        fullWidth
                    />

                    <ActionButtons
                        onCancel={() => {
                            setIsAdding(false)
                            setNewTitle('')
                            setNewDescription('')
                        }}
                        onSave={() => {
                            handleSubmit()
                            setNewTitle('')
                            setNewDescription('')

                        }}
                    />
                </div>
            ) : (
                <Button
                    sx={{
                        width: '100%',
                        border: '2px dashed  #90A1B9',
                        backgroundColor: "#F6F7F9",
                        color: "#8198AF",
                        mt: 1,
                    }}
                    endIcon={<img src={`${CONFIG.assetsDir}/assets/icons/home/plus.png`} />}
                    onClick={() => setIsAdding(true)}>
                    {t('addTask')}
                </Button>
            )}
        </Box>
    );
};
