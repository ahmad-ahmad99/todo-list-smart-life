import type { IconButtonProps } from '@mui/material/IconButton';

import { useCallback } from 'react';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';


import { useTranslate, type LangCode } from '../../../locales';
import { usePopover } from '../../../hooks/popover/use-popover';
import { CustomPopover } from '../custom-popover';
import { FlagIcon } from '../flag-icon';

// ----------------------------------------------------------------------

export type LanguagePopoverProps = IconButtonProps & {
    data?: {
        value: string;
        label: string;
        countryCode: string;
    }[];
};

export function LanguagePopover({ data = [], sx, ...other }: LanguagePopoverProps) {
    const { open, anchorEl, onClose, onOpen } = usePopover();

    const { onChangeLang, currentLang } = useTranslate();

    const handleChangeLang = useCallback(
        (lang: LangCode) => {
            onChangeLang(lang);
            onClose();
        },
        [onChangeLang, onClose]
    );

    const renderMenuList = () => (
        <CustomPopover open={open} anchorEl={anchorEl} onClose={onClose}>
            <MenuList sx={{ width: 160, minHeight: 72 }}>
                {data?.map((option) => (
                    <MenuItem
                        key={option.value}
                        selected={option.value === currentLang.value}
                        onClick={() => handleChangeLang(option.value as LangCode)}
                    >
                        <FlagIcon code={option.countryCode} />
                        {option.label}
                    </MenuItem>
                ))}
            </MenuList>
        </CustomPopover>
    );

    return (
        <>
            <IconButton
                component={'button'}
                aria-label="Languages button"
                onClick={onOpen}
                sx={[
                    (theme) => ({
                        ...(open && { bgcolor: theme.vars.palette.action.selected }),
                    }),
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
                {...other}
            >
                <FlagIcon code={currentLang.countryCode} />
            </IconButton>

            {renderMenuList()}
        </>
    );
}
