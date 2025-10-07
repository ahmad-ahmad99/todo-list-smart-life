import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from '../../../hooks/routes';
import { useAuthContext } from '../../../hooks/auth/jwt';
import { signInWithPassword } from '../../../context/auth/jwt';
import { getErrorMessage } from '../../../utils';
import { FormHead } from '../../shared/form/FormHead';
import { Form } from '../../shared/form/hook-form/form-provider';
import { Field } from '../../shared/form/hook-form/fields';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CONFIG } from '../../../global-config';
import Link from '@mui/material/Link';
import { RouterLink } from '../../shared/routes';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// ----------------------------------------------------------------------

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export const SignInSchema = zod.object({
    username: zod
        .string()
        .min(1, { message: 'Username is required!' }),
    password: zod
        .string()
        .min(1, { message: 'Password is required!' })
        .min(6, { message: 'Password must be at least 6 characters!' }),
});

// ----------------------------------------------------------------------

export function JwtSignInView() {
    const router = useRouter();

    // const showPassword = useBoolean();
    const [showPassword, setShowPassword] = useState<boolean>(true)
    const { checkUserSession } = useAuthContext();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const defaultValues: SignInSchemaType = {
        username: '',
        password: '',
    };

    const methods = useForm<SignInSchemaType>({
        resolver: zodResolver(SignInSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await signInWithPassword({ username: data.username, password: data.password });
            await checkUserSession?.();

            router.refresh();
        } catch (error) {
            console.error(error);
            const feedbackMessage = getErrorMessage(error);
            setErrorMessage(feedbackMessage);
        }
    });

    const renderForm = () => (
        <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
            <Field.Text
                name="username"
                label='Username'
                size='small'

                sx={{
                    "& .MuiInputAdornment-root": {
                        marginTop: 0
                    },
                    '& .MuiInputLabel-root': {
                        marginLeft: "30px"
                    },
                    '& .MuiFilledInput-root': {
                        borderRadius: 1.8,
                        backgroundColor: '#fff',
                        boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em'
                    },
                    '& .MuiFilledInput-underline:before': {
                        borderBottom: 0,
                    },
                    '& .MuiInputAdornment-root.MuiInputAdornment-positionStart.MuiInputAdornment-root:not(MuiInputAdornment-root)': {
                        marginTop: 0
                    },
                }}
                variant='filled'
                slotProps={{

                    input: {

                        startAdornment: (
                            <InputAdornment position="start">
                                <img src={`${CONFIG.assetsDir}/assets/icons/ic_user.svg`} />

                            </InputAdornment>
                        )
                    },
                }}

            />

            <Box sx={{ gap: 1.5, display: 'flex', flexDirection: 'column' }}>
                <Field.Text
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant='filled'
                    size='small'
                    sx={{
                        '& .MuiInputAdornment-root.MuiInputAdornment-positionStart.MuiInputAdornment-root:not(MuiInputAdornment-root)': {
                            marginTop: 0
                        },
                        '& .MuiInputAdornment-root.MuiInputAdornment-positionEnd.MuiInputAdornment-root:not(MuiInputAdornment-root)': {
                            pr: 1
                        },
                        '& .MuiInputLabel-root': {
                            marginLeft: "30px"
                        },
                        '& .MuiFilledInput-root': {
                            borderRadius: 1.8,
                            backgroundColor: '#fff',
                            boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em'
                        },
                        '& .MuiFilledInput-underline:before': {
                            borderBottom: 0,
                        },
                    }}
                    slotProps={{

                        input: {

                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <img src={`${CONFIG.assetsDir}/assets/icons/Mask Group 42.svg`} /> : <VisibilityOffIcon fontSize='small' sx={{ color: "#a4afb7" }} />}


                                    </IconButton>
                                </InputAdornment>
                            ),
                            startAdornment: (
                                <InputAdornment position="start">
                                    <img src={`${CONFIG.assetsDir}/assets/icons/ic_password.svg`} />
                                </InputAdornment>
                            )
                        },
                    }}
                />
            </Box>
            <Box sx={{ gap: 1.5, display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>


                <FormControlLabel control={<Checkbox size='small' sx={{ outlineOffset: 2, }} />} label="Remember me" sx={{ color: "#6c6c81" }} />
                <Link
                    component={RouterLink}
                    href="#"
                    variant='body1'
                    sx={{ textDecoration: "none", color: "#6c6c81", fontSize: "16px" }}
                >
                    Forgot password
                </Link>
            </Box>
            <Box sx={{ gap: 3, display: 'flex', justifyContent: "space-between", alignItems: 'center', mt: 3 }}>
                <Button
                    fullWidth
                    color="primary"
                    size="large"
                    variant="outlined"
                    loadingIndicator="Register..."
                    sx={{ borderColor: "#3b86ff", color: "#3b86ff", borderRadius: 2, boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px" }}
                >
                    Register
                </Button>
                <Button
                    fullWidth
                    color="primary"
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    loadingIndicator="Login..."
                    sx={{ backgroundColor: "#3b86ff", borderRadius: 2, boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px" }}

                >
                    Login
                </Button>
            </Box>

        </Box>
    );

    return (
        <>
            <FormHead icon={<img src={`${CONFIG.assetsDir}/assets/login/logo-text.png`} width={250} />} title={'Welcom back! Please login to your account'} sx={{ textAlign: { xs: 'center' } }} />
            {!!errorMessage && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {errorMessage}
                </Alert>
            )}

            <Form methods={methods} onSubmit={onSubmit}>
                {renderForm()}
            </Form>
        </>
    );
}
