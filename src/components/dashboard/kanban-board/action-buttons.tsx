import React from 'react';
import { Box, Button } from '@mui/material';
import { useTranslate } from '../../../locales';

type ActionButtonsProps = {
    onSave: () => void;
    onCancel: () => void;
    onClose?: () => void;
    setIsEditing?: (value: boolean) => void;
    saveLabel?: string;
    cancelLabel?: string;
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    onSave,
    onCancel,
    onClose,
    setIsEditing,
    saveLabel = 'save',
    cancelLabel = 'cancel',
}) => {
    const { t } = useTranslate()
    const handleSaveClick = () => {
        onClose?.();
        onSave();
    };

    const handleCancelClick = () => {
        onClose?.();
        if (setIsEditing) setIsEditing(false);
        onCancel();
    };

    return (
        <Box display="flex" gap={1} mt={1}>
            <Button
                onClick={handleSaveClick}
                size="small"
                variant="contained"
                sx={{ backgroundColor: '#00579f', color: '#fff' }}
            >
                {t(saveLabel)}
            </Button>
            <Button
                color="error"
                onClick={handleCancelClick}
                size="small"
                variant="outlined"
            >
                {t(cancelLabel)}
            </Button>
        </Box>
    );
};