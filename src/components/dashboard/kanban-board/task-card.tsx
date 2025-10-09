import React, { useState } from "react";
import type { Task } from "./types";
import { Box, Button, Grid, IconButton, Menu, MenuItem, TextField, Typography } from "@mui/material";
import { useTranslate } from "../../../locales";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ActionButtons } from "./action-buttons";
import { useTask } from "./use-task";

type Props = {
    task: Task;
    onEdit: (updated: Task) => void;
    onDelete: (id: string) => void;
    disabled?: boolean;

};

export const TaskCard: React.FC<Props> = ({ task, onEdit, onDelete }) => {
    const {
        anchorEl,
        isEditing,
        setIsEditing,
        title,
        setTitle,
        description,
        setDescription,
        open,
        handleClick,
        handleClose,
    } = useTask(task);

    const { t } = useTranslate()
    const handleSave = () => {
        if (title.trim()) {
            onEdit({ ...task, title, description });
            setIsEditing(false);
        }
    };

    return (
        <Box sx={{ border: "1px solid #EBEEF3", backgroundColor: "#fff", padding: 1, marginBottom: "0px", borderRadius: '10px' }}>
            {isEditing ? (
                <>
                    <TextField
                        size="small"
                        fullWidth
                        value={title}
                        variant="outlined"
                        label={t('title')}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: "100%", marginBottom: "8px" }}
                    />
                    <TextField
                        value={description}
                        size="small"
                        fullWidth
                        multiline
                        label={t('description')}
                        minRows={3}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: "100%", marginBottom: "8px" }}
                    />

                    <ActionButtons
                        onCancel={() => {
                            handleClose();
                            setIsEditing(false)
                            setTitle('')
                            setDescription('')
                        }}
                        onSave={() => {
                            handleClose();
                            handleSave()
                            setTitle('')
                            setDescription('')
                        }}
                    />
                </>
            ) : (
                <>
                    <Grid container alignItems={'start'} justifyContent={'space-between'}>
                        <Grid flex={1}>
                            <Typography variant="h6" sx={{ fontSize: '16px', color: "#374555" }}>{task.title}</Typography>
                            <Typography variant="body1" sx={{ color: "#8198AF" }}>{task.description}</Typography>
                        </Grid>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            sx={{ p: 1, px: 0.5 }}
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            sx={{
                                '& .MuiPaper-root': {
                                    backgroundColor: "#fff"
                                }
                            }}
                        >
                            <MenuItem onClick={() => setIsEditing(true)}>
                                <IconButton >
                                    <EditIcon color="primary" sx={{ color: "#00579f" }} />
                                </IconButton>

                            </MenuItem>
                            <MenuItem onClick={() => onDelete(task.id)}>
                                <IconButton>
                                    <DeleteIcon sx={{ color: "red" }} />
                                </IconButton>

                            </MenuItem>
                        </Menu>
                    </Grid>
                </>
            )}
        </Box>
    );
};