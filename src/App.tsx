import { Provider } from "react-redux";
import { store } from "./store";
import FileExplorer from "./components/FileExplorer";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <FileExplorer />
    </Provider>
  );
}

export default App;
