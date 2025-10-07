import { JwtSignInView } from "../../../components/auth/jwt";
import { CONFIG } from "../../../global-config";

const metadata = { title: `Sign in | Jwt - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <title>{metadata.title}</title>

            <JwtSignInView />
        </>
    );
}
