import "./App.css";
import { TagsTable } from "./components/tags-table";

function App() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-xl font-bold my-4">Browse Stack Overflow Tags</h1>
      <TagsTable />
    </main>
  );
}

export default App;
