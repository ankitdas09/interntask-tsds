import CPagination from "./components/pagination";
import CTable from "./components/table";
import useRequest from "./hooks/useRequest";
// import { Button } from "./components/ui/button";

function App() {
    const { response, loading, error } = useRequest({
        url: "http://localhost:8000",
        method: "get",
        body: null,
    });
    console.log(response)
    return (
        <>
        {loading && "loading"}
        {error && "error"}
        {/* {response} */}
            <div className="container p-3">
              {!loading && !error &&
                <CTable citizens={response}/>
              }
                <CPagination pages={[1, 2, 3]} last={9} />
            </div>
        </>
    );
}

export default App;
