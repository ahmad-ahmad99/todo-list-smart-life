import { Container, styled, type Breakpoint } from "@mui/material";
import type { ReactNode } from "react";
import { useTranslate } from "../../locales";



interface FooterSectionProps {
    layoutQuery?: Breakpoint;
    children: ReactNode;

}


export function FooterSection({ children }: FooterSectionProps) {
    const { currentLang } = useTranslate()
    return (
        <FooterContainer>
            <FooterCenterArea sx={{ flexDirection: currentLang.value === 'ar' ? 'row-reverse' : 'inherit' }}>
                {children}
            </FooterCenterArea>
        </FooterContainer>
    );

}


const FooterContainer = styled(Container, {
    shouldForwardProp: (prop: string) => !['layoutQuery', 'sx'].includes(prop),
})<Pick<FooterSectionProps, 'layoutQuery'>>(({ layoutQuery = 'md', theme }) => ({
    display: 'flex',
    alignItems: 'center',
    color: 'var(--color)',
    height: 'var(--layout-footer-mobile-height)',
    backgroundColor: 'var(--layout-footer-bg-color)',
    borderRadius: 'var(--layout-footer-border-radius)',
    [theme.breakpoints.up(layoutQuery)]: {
        height: 'var(--layout-footer-desktop-height)',
    },
}));


const FooterCenterArea = styled('div')(() => ({
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
    alignItems: 'center'
}));