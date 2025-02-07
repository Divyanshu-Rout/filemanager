import styled from "styled-components";

export const ExplorerContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #000;
  position: relative;
  overflow: hidden;
`;

export const FolderItem = styled.div<{ $isDragging?: boolean }>`
  position: absolute;
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: move;
  user-select: none;
  opacity: ${(props) => (props.$isDragging ? 0.5 : 1)};
  background-color: ${(props) =>
    props.$isDragging ? "#e0e0e0" : "transparent"};
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  span {
    margin-top: 4px;
    font-size: 12px;
    text-align: center;
    max-width: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const ContextMenu = styled.div<{ $x: number; $y: number }>`
  position: absolute;
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

export const MenuItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
