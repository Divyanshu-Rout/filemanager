export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  position: {
    x: number;
    y: number;
  };
}

export interface FolderState {
  folders: Record<string, Folder>;
  selectedFolderId: string | null;
}
