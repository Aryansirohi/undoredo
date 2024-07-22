// undoredo.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faRedo, faPlay } from "@fortawesome/free-solid-svg-icons";

const UndoRedoButton = ({ onUndo, onRedo, onReplay }) => {
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [replayIndex, setReplayIndex] = useState(0);

  const handleUndo = () => {
    if (onUndo) {
      onUndo();
      setCanRedo(true);
    }
  };

  const handleRedo = () => {
    if (onRedo) {
      onRedo();
      setCanUndo(true);
    }
  };

  const handleReplay = () => {
    if (onReplay) {
      onReplay(replayIndex);
      setReplayIndex(replayIndex + 1);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        onClick={handleUndo}
        disabled={!canUndo}
      >
        <FontAwesomeIcon icon={faUndo} />
      </button>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        onClick={handleRedo}
        disabled={!canRedo}
      >
        <FontAwesomeIcon icon={faRedo} />
      </button>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        onClick={handleReplay}
      >
        <FontAwesomeIcon icon={faPlay} />
        <span className="ml-2">{replayIndex + 1}</span>
      </button>
    </div>
  );
};

export default UndoRedoButton;