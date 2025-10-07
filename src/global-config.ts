import packageJson from '../package.json';
import { paths } from './routes/paths';


export type ConfigValue = {
    appName: string;
    appVersion: string;

    serverUrl: string;
    assetsDir: string;
    auth: {
        method: 'jwt';
        skip: boolean;
        redirectPath: string;
    };
}

export const CONFIG: ConfigValue = {

    appName: 'Services Management',
    appVersion: packageJson.version,
    serverUrl: import.meta.env.VITE_SERVER_URL ?? '',
    assetsDir: import.meta.env.VITE_ASSETS_DIR ?? '',
    /**
     * Auth
     * @method jwt | amplify | firebase | supabase | auth0
     */
    auth: {
        method: 'jwt',
        skip: false,
        redirectPath: paths.dashboard.root,
    },
}