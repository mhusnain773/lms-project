"use client"

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";



interface ChaptersListProps {
    items: Chapter[];
    onReorder: (UpdateData: { id: string; position: number}[]) => void;
    onEdit: (id: string) => void;
};

export const ChaptersList = ({
    items,
    onReorder,
    onEdit
}: ChaptersListProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    useEffect(() => {
        setChapters(items);
    }, [items]);

    return(
        <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId="chapters">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters.map((chapter, index) => (
                            <Draggable
                            key={chapter.id}
                            draggableId={chapter.id}
                            index={index}
                            >
                                {(provided) => (
                                    <div className={cn(
                                        "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb- text-sm",
                                        chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
                                    )}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    >
                                        <div
                                        className={cn(
                                            "px-2 py-3 border-r-slate-200 hover:bg-slate-300 rounded-l-md transition"
                                        
                                            )}
                                        ></div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}