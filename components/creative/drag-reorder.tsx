"use client";

import React, { useState } from "react";
import { Reorder, useDragControls, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

export interface DragReorderProps<T> {
  items: T[];
  onReorder: (newOrder: T[]) => void;
  renderItem: (
    item: T,
    index: number,
    dragControls: ReturnType<typeof useDragControls>
  ) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  className?: string;
  axis?: "x" | "y";
}

export function DragReorder<T>({
  items,
  onReorder,
  renderItem,
  keyExtractor,
  className,
  axis = "y",
}: DragReorderProps<T>) {
  return (
    <Reorder.Group
      axis={axis}
      values={items}
      onReorder={onReorder}
      className={cn("flex gap-2", axis === "y" ? "flex-col" : "flex-row", className)}
    >
      {items.map((item, index) => (
        <ReorderItem
          key={keyExtractor(item)}
          item={item}
          index={index}
          renderItem={renderItem}
        />
      ))}
    </Reorder.Group>
  );
}

function ReorderItem<T>({
  item,
  index,
  renderItem,
}: {
  item: T;
  index: number;
  renderItem: (
    item: T,
    index: number,
    dragControls: ReturnType<typeof useDragControls>
  ) => React.ReactNode;
}) {
  const dragControls = useDragControls();
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Reorder.Item
      value={item}
      dragListener={false} // Disable dragging on the whole item, use handle
      dragControls={dragControls}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className="relative w-full outline-none focus:outline-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileDrag={{
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
        cursor: "grabbing",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div
        className={cn(
          "w-full rounded-xl transition-colors duration-200",
          isDragging ? "bg-white/5 border-white/20 z-50 relative" : "bg-transparent border-transparent"
        )}
      >
        {renderItem(item, index, dragControls)}
      </div>
    </Reorder.Item>
  );
}
