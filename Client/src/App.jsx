import DataProvider from "./context/DataProvider"
import MyApp from "./Router/MyApp"

function App() {

  return (
    <main>
        <DataProvider>

        <MyApp/>
        </DataProvider>

    </main>
  )
}

export default App
