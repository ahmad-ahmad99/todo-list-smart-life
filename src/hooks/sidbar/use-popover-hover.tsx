import { useState, useRef, useCallback } from 'react';

type UsePopoverHoverReturn<T extends HTMLElement> = {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
    anchorEl: T | null;
    elementRef: React.RefObject<T>;
};

export function usePopoverHover<T extends HTMLElement = HTMLElement>(): UsePopoverHoverReturn<T> {
    const elementRef = useRef<T>(null!); // 👈 assert non-null for type compatibility
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<T | null>(null);

    const onOpen = useCallback(() => {
        if (elementRef.current) {
            setAnchorEl(elementRef.current);
            setOpen(true);
        }
    }, []);

    const onClose = useCallback(() => {
        setOpen(false);
        setAnchorEl(null);
    }, []);

    return {
        open,
        onOpen,
        onClose,
        anchorEl,
        elementRef,
    };
}