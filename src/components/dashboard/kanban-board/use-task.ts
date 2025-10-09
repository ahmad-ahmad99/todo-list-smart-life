import { useState } from 'react';
import type { Task } from './types';

export const useTask = (task: Task) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return {
        isEditing,
        setIsEditing,
        title,
        setTitle,
        description,
        setDescription,
        anchorEl,
        setAnchorEl,
        open,
        handleClick,
        handleClose,
    };
};