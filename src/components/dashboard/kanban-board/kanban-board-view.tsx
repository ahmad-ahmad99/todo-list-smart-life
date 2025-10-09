import { CONFIG } from "../../../global-config";
import { paths } from "../../../routes/paths";
import { CustomBreadcrumbs } from "../../shared/custom-breadcrumbs";
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import { SvgColor } from "../../shared/svg-color";
import { DashboardContent, StyledIconButton } from "../../../layouts/dashboard";
import { useTranslate } from "../../../locales";
import { Box, Button, Grid, Stack, TextField, Typography, useTheme } from "@mui/material";
import { ColumnView } from "./columns";
import { useKanbanBoard } from "./use-kanban-board";
import { ActionButtons } from "./action-buttons";



export function KanbanBoardView() {
    const theme = useTheme();
    const maxWidthValue = theme.breakpoints.values['lg'];
    const {
        columns,
        isAddingColumn,
        setIsAddingColumn,
        newColumnName,
        setNewColumnName,
        addColumn,
        addTask,
        editTask,
        deleteTask,
    } = useKanbanBoard();

    const { t } = useTranslate()
    return (
        <>
            <DashboardContent maxWidth="xl" sx={{ overflow: 'hidden' }}>
                <CustomBreadcrumbs
                    links={[
                        {
                            name: '',
                            href: paths.dashboard.root,
                            icon: <SvgColor sx={{ color: "#4D637C" }} src={`${CONFIG.assetsDir}/assets/icons/navbar/home.svg`} />,
                        },
                        { name: t('taskManagement'), icon: <ChevronRightTwoToneIcon /> },

                        { name: t('tasks'), icon: <ChevronRightTwoToneIcon sx={{ color: "#4D637C" }} /> },
                    ]}
                    activeLast
                    sx={{ mb: { xs: 3, md: 5 } }}
                />
                <Box sx={{ backgroundColor: "#fff", borderRadius: 1, pt: 1, pb: 1, pl: 2.5, pr: 2.5, position: "absolute" }} maxWidth={{ lg: maxWidthValue, md: '100%' }}>
                    <>
                        <Grid container justifyContent={"space-between"} pb={1} alignItems={"center"} borderBottom={"2px solid #f8f8f8"} >
                            <Typography sx={{ color: "#535862", fontSize: "16px" }}>
                                {t('employmentRequests')}
                            </Typography>

                            <StyledIconButton sx={{ padding: "10px" }}>
                                <img src={`${CONFIG.assetsDir}/assets/icons/home/filter.png`} />
                            </StyledIconButton>
                        </Grid>

                        <Stack sx={{ overflowX: 'auto', mt: 2 }}>
                            <Stack style={{
                                display: 'unset',
                            }}>
                                <Box sx={{
                                    flex: '1 1 auto',
                                    display: 'flex',
                                    gap: 2,
                                    pb: 2
                                }}>
                                    {columns.map(col => (
                                        <ColumnView
                                            key={col.id}
                                            column={col}
                                            onAddTask={addTask}
                                            onEditTask={editTask}
                                            onDeleteTask={deleteTask}
                                        />
                                    ))}
                                    <div style={{ minWidth: "250px", boxSizing: "border-box" }}>
                                        {isAddingColumn ? (
                                            <div style={{ border: "1px solid #ccc", padding: "8px", borderRadius: "4px" }}>

                                                <TextField
                                                    size="small"
                                                    fullWidth
                                                    value={newColumnName}
                                                    label={t('title')}

                                                    onChange={(e) => setNewColumnName(e.target.value)}
                                                    style={{ width: "100%", marginBottom: "4px" }}
                                                />
                                                <ActionButtons
                                                    onCancel={() => {
                                                        setIsAddingColumn(false)
                                                        setNewColumnName('')
                                                    }}
                                                    onSave={() => {
                                                        addColumn()
                                                        setNewColumnName('')

                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <Button
                                                sx={{
                                                    width: '100%',
                                                    border: '2px dashed  #90A1B9',
                                                    backgroundColor: "#F6F7F9",
                                                    color: "#8198AF",
                                                    mt: 1,
                                                }}
                                                endIcon={<img src={`${CONFIG.assetsDir}/assets/icons/home/plus.png`} />}
                                                onClick={() => setIsAddingColumn(true)}>
                                                {t('addColumn')}
                                            </Button>
                                        )}
                                    </div>
                                </Box>
                            </Stack>

                        </Stack>



                    </>

                </Box>
            </DashboardContent>
        </>
    )

}