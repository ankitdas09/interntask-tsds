import { useEffect, useState } from "react";
import CPagination from "./components/pagination";
import CTable from "./components/table";
import { TCitizen } from "types";
import axios from "axios";
import CAddCitizen from "./components/add";

function App() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [citizens, setCitizens] = useState<TCitizen[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    function getAdjacentPages() {
        const ret = [];
        let j = 0;
        for (let i = page; i <= totalPages / 10 && j < 3; i++) {
            ret.push(i);
            j++;
        }
        return ret;
    }

    async function fetchPageData() {
        try {
            setLoading(true);
            const resp = await axios.get(`http://localhost:8000/?page=${page}&limit=10`);
            setCitizens(resp.data);
            setLoading(false);
            setError(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    }

    async function fetchMetadata() {
        try {
            setLoading(true);
            const resp = await axios.get(`http://localhost:8000/meta`);
            setTotalPages(resp.data.count);
            setLoading(false);
            setError(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMetadata();
        fetchPageData();
    }, [page]);

    return (
        <>
            <div>
                <nav className="h-16 bg-slate-800 font-bold text-xl text-white flex justify-start items-center">
                    <div className="container">
                        <p>Citizen Management</p>
                    </div>
                </nav>
                <div className="container p-3">
                    <CAddCitizen />
                    {loading && !error && "Loading..."}
                    {!loading && !error && <CTable citizens={citizens} />}
                    {error && "Something went wrong!"}
                    {!loading && !error && (
                        <CPagination
                            curPage={page}
                            handlePageChange={setPage}
                            pages={getAdjacentPages()}
                            last={totalPages / 10}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
