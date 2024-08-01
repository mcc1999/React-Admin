import "./App.css";

function App() {
  return (
    <>
      <h1>React Admin Template</h1>
      <h2>Current Env: {import.meta.env.VITE_APP_ENV}</h2>
      <h2>API HOST: {import.meta.env.VITE_API_HOST}</h2>
      <h2>Var load all env: {import.meta.env.VITE_LOAD_ALL_ENV}</h2>
    </>
  );
}

export default App;
