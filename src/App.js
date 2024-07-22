import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { DragDropContext } from "react-beautiful-dnd";
import UndoRedoButton from "./components/UndoRedoButton";

export default function App() {
  const [containers, setContainers] = useState([
    {
      id: "container-1",
      items: [],
    },
  ]);

  const [inputValues, setInputValues] = useState([]);
  const [undoHistory, setUndoHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const [replayHistory, setReplayHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceContainerId = result.source.droppableId;
    const destinationContainerId = result.destination.droppableId;
    const draggableId = result.draggableId.split("-")[0];

    const updatedContainers = containers.map((container) => {
      if (container.id === destinationContainerId) {
        return {
          ...container,
          items: [
            ...container.items,
            `${draggableId}-${container.items.length}`,
          ],
        };
      }
      
      return container;
    });

    setUndoHistory([...undoHistory, containers]);
    setRedoHistory([]);
    setContainers(updatedContainers);
    setReplayHistory([...replayHistory, updatedContainers]);
    setCurrentIndex(currentIndex + 1);
    setContainers(updatedContainers);

  };
  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setContainers(undoHistory[currentIndex - 1]);
      setRedoHistory([...redoHistory, containers]);
    }
  };

  const handleRedo = () => {
    if (currentIndex < undoHistory.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setContainers(undoHistory[currentIndex + 1]);
      setUndoHistory(undoHistory.slice(0, -1));
    }
  };

  const handleReplay = (index) => {
    if (index < replayHistory.length) {
      setContainers(replayHistory[index]);
      setCurrentIndex(index);
    }
  };

  function handleDelete(containerId, index) {
    const container = containers.find((c) => c.id === containerId);

    if (container && container.items.length > index) {
      container.items.splice(index, 1);
      setContainers([...containers]);
    }
  }

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">

          <DragDropContext onDragEnd={handleDragEnd}>
             
            <Sidebar />
            <MidArea
              containers={containers}
              setContainers={setContainers}
              handleDelete={handleDelete}
              setInputValues={setInputValues}
            />
            <div className="flex flex-col flex-1">
          <div className="flex items-center justify-end pr-4 pt-4">
            <UndoRedoButton
              onUndo={handleUndo}
              onRedo={handleRedo}
              onReplay={handleReplay}
              replayIndex={currentIndex}
            />
          </div>
          </div>
          </DragDropContext>
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea inputValues={inputValues}>

          </PreviewArea>
        </div>
      </div>
    </div>
  );
}