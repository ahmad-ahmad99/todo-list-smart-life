import { KanbanBoardView } from "../../components/dashboard";
import { CONFIG } from "../../global-config";

const metadata = { title: `Kanban Board - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <title>{metadata.title}</title>

            <KanbanBoardView />
        </>
    );
}
