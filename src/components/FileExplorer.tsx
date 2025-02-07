import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ExplorerContainer,
  FolderItem,
  ContextMenu,
  MenuItem,
} from "./styles/FileExplorer.styled";
import {
  createFolder,
  deleteFolder,
  updateFolderPosition,
  setSelectedFolder,
} from "../store/folderSlice";
import { RootState } from "../store";

const FileExplorer: React.FC = () => {
  const dispatch = useDispatch();
  const folders = useSelector((state: RootState) => state.folders.folders);
  const selectedFolderId = useSelector(
    (state: RootState) => state.folders.selectedFolderId
  );

  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({
    visible: false,
    x: 0,
    y: 0,
  });

  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleCreateFolder = () => {
    dispatch(
      createFolder({
        name: "New Folder",
        position: {
          x: contextMenu.x,
          y: contextMenu.y,
        },
      })
    );
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleDragStart = (e: React.DragEvent, folderId: string) => {
    const folder = folders[folderId];
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    dispatch(setSelectedFolder(folderId));
    e.dataTransfer.setData("text/plain", folderId);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const folderId = e.dataTransfer.getData("text/plain");

      if (folderId && folders[folderId]) {
        dispatch(
          updateFolderPosition({
            id: folderId,
            position: {
              x: e.clientX - dragOffset.x,
              y: e.clientY - dragOffset.y,
            },
          })
        );
      }
    },
    [dispatch, dragOffset, folders]
  );

  const handleClickOutside = () => {
    if (contextMenu.visible) {
      setContextMenu({ ...contextMenu, visible: false });
    }
  };

  return (
    <ExplorerContainer
      onContextMenu={handleContextMenu}
      onClick={handleClickOutside}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {Object.values(folders).map((folder) => (
        <FolderItem
          key={folder.id}
          draggable
          onDragStart={(e) => handleDragStart(e, folder.id)}
          onDrag={handleDrag}
          style={{
            left: folder.position.x,
            top: folder.position.y,
          }}
          $isDragging={folder.id === selectedFolderId}
        >
          📁
          <span>{folder.name}</span>
        </FolderItem>
      ))}
      {contextMenu.visible && (
        <ContextMenu $x={contextMenu.x} $y={contextMenu.y}>
          <MenuItem onClick={handleCreateFolder}>New Folder</MenuItem>
          {selectedFolderId && (
            <MenuItem
              onClick={() => {
                dispatch(deleteFolder(selectedFolderId));
                setContextMenu({ ...contextMenu, visible: false });
              }}
            >
              Delete Folder
            </MenuItem>
          )}
        </ContextMenu>
      )}
    </ExplorerContainer>
  );
};

export default FileExplorer;
