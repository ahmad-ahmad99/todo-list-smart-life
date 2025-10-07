import React from 'react';
import { Stack, Divider, Box } from '@mui/material';
import type { CustomTabsProps } from './type';

const CustomTabs: React.FC<CustomTabsProps> = ({ tabs, value, onChange, sx }) => (
    <Stack direction="row" spacing={0} alignItems="center" justifyContent={"center"} sx={{ mt: 2 }}>
        {tabs.map((tab, index) => (
            <React.Fragment key={tab.value}>
                <Box
                    onClick={(event) => onChange(event, tab.value)}
                    sx={{
                        borderRadius: 4,
                        height: 58,
                        width: 58,
                        mx: 3,
                        px: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: tab.disabled ? 'not-allowed' : 'pointer',
                        backgroundColor: value === tab.value ? '#ffffff' : '#e7e9ef',
                        color: value === tab.value ? 'primary.main' : 'text.primary',
                        fontWeight: 500,
                        textTransform: 'none',
                        opacity: tab.disabled ? 0.5 : 1,
                        transition: 'background-color 0.3s ease',
                        ...sx,
                    }}
                >
                    {tab.icon}
                    {tab.label}
                </Box>

                {index < tabs.length - 1 && (
                    <Divider orientation="vertical" flexItem sx={{ height: 25, mt: 2 }} />
                )}
            </React.Fragment>
        ))}
    </Stack>
);

export default CustomTabs;