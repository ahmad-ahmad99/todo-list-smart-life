
import type { TabProps } from '@mui/material';

export interface TabItem extends TabProps { }

export interface CustomTabsProps {
    tabs: TabItem[];
    value: string | number | false;
    onChange: (event: React.SyntheticEvent, newValue: string) => void;
    sx?: object;
}
