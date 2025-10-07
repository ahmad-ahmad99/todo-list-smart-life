import type { Theme, SxProps } from '@mui/material/styles';


import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


// ----------------------------------------------------------------------


export type RoleBasedGuardProp = {
  sx?: SxProps<Theme>;
  currentRole: string;
  hasContent?: boolean;
  allowedRoles: string | string[];
  children: React.ReactNode;
};

export function RoleBasedGuard({
  sx,
  children,
  hasContent,
  currentRole,
  allowedRoles,
}: RoleBasedGuardProp) {
  if (currentRole && allowedRoles && !allowedRoles.includes(currentRole)) {
    return hasContent ? (
      <Container
        sx={[{ textAlign: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          Permission denied
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          You do not have permission to access this page.
        </Typography>

      </Container>
    ) : null;
  }

  return <> {children} </>;
}
