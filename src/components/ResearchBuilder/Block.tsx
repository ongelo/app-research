import { Paper } from "@mantine/core";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";
import FormBlock from "./FormBlock";
import { UseFormReturnType } from "@mantine/form/lib/types";
import BlockTools from "./BlockTools";

type Props = {
  index: number;
  id: string;
  form: UseFormReturnType<ResearchBuilderFormValues>;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onDelete: () => void;
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const Block: React.FC<Props> = ({ index, id, form, onMove, onDelete }) => {
  const dragRef = useRef<HTMLButtonElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "block",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!dragRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = dragRef.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      onMove(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [_, drag, preview] = useDrag({
    type: "block",
    item: () => ({ id, index }),
  });

  drag(dragRef);
  drop(preview(previewRef));
  return (
    <Paper
      ref={previewRef}
      data-handler-id={handlerId}
      shadow="xs"
      p="md"
      withBorder
      pos="relative"
      w="calc(100% - 32px)"
    >
      <BlockTools dragRef={dragRef} onDelete={onDelete} />
      <FormBlock id={id} form={form} />
    </Paper>
  );
};

export default Block;
