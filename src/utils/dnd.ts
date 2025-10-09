import type { DroppableContainer, KeyboardCoordinateGetter } from '@dnd-kit/core';

import { KeyboardCode, closestCorners, getFirstCollision } from '@dnd-kit/core';
import type { Column, KanbanState, Task } from '../components/dashboard/kanban-board/types';
import { startTransition } from 'react';

// ----------------------------------------------------------------------

const directions: string[] = [
    KeyboardCode.Down,
    KeyboardCode.Right,
    KeyboardCode.Up,
    KeyboardCode.Left,
];

export const coordinateGetter: KeyboardCoordinateGetter = (
    event,
    { context: { active, droppableRects, droppableContainers, collisionRect } }
) => {
    if (directions.includes(event.code)) {
        event.preventDefault();

        if (!active || !collisionRect) {
            return;
        }

        const filteredContainers: DroppableContainer[] = [];

        droppableContainers.getEnabled().forEach((entry) => {
            if (!entry || entry?.disabled) {
                return;
            }

            const rect = droppableRects.get(entry.id);

            if (!rect) {
                return;
            }

            const data = entry.data.current;

            if (data) {
                const { type, children } = data;

                if (type === 'container' && children?.length > 0) {
                    if (active.data.current?.type !== 'container') {
                        return;
                    }
                }
            }

            switch (event.code) {
                case KeyboardCode.Down:
                    if (collisionRect.top < rect.top) {
                        filteredContainers.push(entry);
                    }
                    break;
                case KeyboardCode.Up:
                    if (collisionRect.top > rect.top) {
                        filteredContainers.push(entry);
                    }
                    break;
                case KeyboardCode.Left:
                    if (collisionRect.left >= rect.left + rect.width) {
                        filteredContainers.push(entry);
                    }
                    break;
                case KeyboardCode.Right:
                    if (collisionRect.left + collisionRect.width <= rect.left) {
                        filteredContainers.push(entry);
                    }
                    break;
            }
        });

        const collisions = closestCorners({
            active,
            collisionRect,
            droppableRects,
            droppableContainers: filteredContainers,
            pointerCoordinates: null,
        });
        const closestId = getFirstCollision(collisions, 'id');

        if (closestId != null) {
            const newDroppable = droppableContainers.get(closestId);
            const newNode = newDroppable?.node.current;
            const newRect = newDroppable?.rect.current;

            if (newNode && newRect) {
                if (newDroppable.id === 'placeholder') {
                    return {
                        x: newRect.left + (newRect.width - collisionRect.width) / 2,
                        y: newRect.top + (newRect.height - collisionRect.height) / 2,
                    };
                }

                if (newDroppable.data.current?.type === 'container') {
                    return { x: newRect.left + 20, y: newRect.top + 74 };
                }

                return { x: newRect.left, y: newRect.top };
            }
        }
    }

    return undefined;
};


export function moveTask(updateTasks: KanbanState['columns']) {
    startTransition(() => {
        try {
            localStorage.setItem('kanban_data', JSON.stringify({ columns: updateTasks }));
        } catch (error) {
            console.error('Failed to move task in localStorage:', error);
        }
    });
}

export async function moveColumn(updateColumns: Column[]) {
    /**
     * Work in local
     */
    startTransition(() => {
        try {
            const updatedBoard = { columns: updateColumns };
            localStorage.setItem('kanban_data', JSON.stringify(updatedBoard));
        } catch (error) {
            console.error('Failed to update columns in localStorage:', error);
        }
    });


}

