import { useState, useCallback, type SetStateAction, type Dispatch, type MouseEvent } from 'react';

export type UsePopoverReturn<T extends HTMLElement = HTMLElement> = {
    open: boolean;
    anchorEl: T | null;
    onOpen: (event: MouseEvent<T>) => void;
    onClose: () => void;
    setAnchorEl: Dispatch<SetStateAction<T | null>>;
};

export function usePopover<T extends HTMLElement = HTMLElement>(): UsePopoverReturn<T> {
    const [anchorEl, setAnchorEl] = useState<T | null>(null);

    const onOpen = useCallback((event: MouseEvent<T>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const onClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const open = Boolean(anchorEl);

    return { open, anchorEl, onOpen, onClose, setAnchorEl };
}