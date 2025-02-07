import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { FolderState } from "../types/folder";

const initialState: FolderState = {
  folders: {
    "default-folder": {
      id: "default-folder",
      name: "My Folder",
      parentId: null,
      position: { x: 100, y: 100 },
    },
  },
  selectedFolderId: null,
};

const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    createFolder: (
      state,
      action: PayloadAction<{
        name: string;
        position: { x: number; y: number };
      }>
    ) => {
      const id = uuidv4();
      state.folders[id] = {
        id,
        name: action.payload.name,
        parentId: null,
        position: action.payload.position,
      };
    },
    deleteFolder: (state, action: PayloadAction<string>) => {
      delete state.folders[action.payload];
    },
    updateFolderPosition: (
      state,
      action: PayloadAction<{ id: string; position: { x: number; y: number } }>
    ) => {
      state.folders[action.payload.id].position = action.payload.position;
    },
    setSelectedFolder: (state, action: PayloadAction<string | null>) => {
      state.selectedFolderId = action.payload;
    },
  },
});

export const {
  createFolder,
  deleteFolder,
  updateFolderPosition,
  setSelectedFolder,
} = folderSlice.actions;
export default folderSlice.reducer;
