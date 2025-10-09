import { CONFIG } from "../../../global-config";
import { paths } from "../../../routes/paths";
import { CustomBreadcrumbs } from "../../shared/custom-breadcrumbs";
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import { SvgColor } from "../../shared/svg-color";
import { StyledIconButton } from "../../../layouts/dashboard";
import { useTranslate } from "../../../locales";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { ColumnView } from "./columns";
import { useKanbanBoard } from "./use-kanban-board";
import { ActionButtons } from "./action-buttons";
import { closestCenter, DndContext, DragOverlay, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { TaskCard } from "./task-card";



export function KanbanBoardView() {

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // drag starts after slight movement
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 100,
                tolerance: 5,
            },
        })
    );


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
        handleDragEnd,
        handleDragStart,
        activeTask
    } = useKanbanBoard();

    const { t } = useTranslate()
    return (
        <>
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
                sx={{ mb: { xs: 3, md: 5 }, mt: 2 }}
            />
            <Box
                sx={{
                    backgroundColor: "#fff",
                    borderRadius: 1,
                    mt: 8,
                    mr: 1,

                    pt: 1,
                    pb: 1,
                    pl: 2.5,
                    pr: 2.5,
                    position: 'absolute',
                    overflow: 'hidden',
                    width: "-webkit-fill-available"
                }} >
                <>
                    <Grid container justifyContent={"space-between"} pb={1} alignItems={"center"} borderBottom={"2px solid #f8f8f8"} >
                        <Typography sx={{ color: "#535862", fontSize: "16px" }}>
                            {t('employmentRequests')}
                        </Typography>

                        <StyledIconButton sx={{ padding: "10px" }}>
                            <img src={`${CONFIG.assetsDir}/assets/icons/home/filter.png`} />
                        </StyledIconButton>
                    </Grid>

                    <Box
                        sx={{
                            overflowX: 'auto',
                            mt: 2,
                            pb: 2,
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'thin',
                            maxWidth: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2,
                                width: "1500px",
                            }}
                        >
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                                onDragStart={handleDragStart}

                            >
                                {columns.map(col => (
                                    <ColumnView
                                        key={col.id}
                                        column={col}
                                        onAddTask={addTask}
                                        onEditTask={editTask}
                                        onDeleteTask={deleteTask}
                                        activeTask={activeTask}
                                    />
                                ))}

                                <DragOverlay>
                                    {activeTask ? (
                                        <TaskCard
                                            task={activeTask}
                                            isDragging
                                            onEdit={() => { }}
                                            onDelete={() => { }}
                                        />
                                    ) : null}
                                </DragOverlay>

                            </DndContext>
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
                    </Box>



                </>
            </Box>
        </>
    )
}