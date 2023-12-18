import React, {useState, useEffect, useMemo} from "react";
import CoachRequestNavbar from "./CoachRequestNavbar";
import CoachCard from "./CoachCard";
import { config } from "../../utils/config";

const CoachRequest = () => {
    const [coachList, setCoachList] = useState([]);
    const [colCount, setColCount] = useState(4);
    const [rowCount, setRowCount] = useState(0);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortKey, setSortKey] = useState("");
    const [sortDirection, setSortDirection] = useState("ascending");
    const [isLoading, setIsLoading] = useState(false);

    //re-renders when a workout plan has been created, edited or deleted
    useEffect(() => {
        const fetchCoachList = async () => {
        setIsLoading(true);
        try{
            const response = await fetch(`${config.backendUrl}/get_coach_dashboard_info/coach_request`, {
            credentials: "include",
            });
        
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if(data.coachList.length > 0){
            setRowCount(Math.floor(data.coachList.length / colCount) + 1);
            }
            setCoachList(data.coachList);
            console.log(data);
        }
        catch(err){
            console.log(err);
        }finally {
            setIsLoading(false);
        }
        }
        fetchCoachList();
        setUploadSuccess(false);
    }, [uploadSuccess]);


    // Filter and sort workout plans
    const filteredAndSortedCoachList = useMemo(() => {
        let filtered = coachList.filter((coach) => coach.firstName.toLowerCase().includes(searchTerm.toLowerCase()));

        if(sortKey){
            filtered.sort((a, b) => {
                const modifier = sortDirection === 'ascending' ? 1 : -1;
                if (a[sortKey] < b[sortKey]) {
                    return -1 * modifier;
                } else if (a[sortKey] > b[sortKey]) {
                    return 1 * modifier;
                }
                    return 0;
            });
        }

        return filtered;
    }, [searchTerm, sortKey, sortDirection, isLoading, uploadSuccess]);

    const createGrid = (cl) => {
        const counter = {count : 0};
        return renderRows(cl, counter);
    }

    const renderRows = (cl, counter) => {
        let rows = [];
        for(let row = 0; row < rowCount; row++){
            rows.push(
                <div key={`row-${row}`} className="row my-3">
                    {renderCols(cl, counter)}
                </div>
            )
        }

        return rows;
    }

    const renderCols = (cl, counter) => {
        let cols = [];
        for(let col = 0; col < colCount; col++){
            if(counter.count < cl.length){
                cols.push(
                    <div key={counter.count} className="col-lg-3">
                        <CoachCard coach={cl[counter.count]} handleUploadSuccessChange={handleUploadSuccessChange}/>
                    </div>
                )
                counter.count++;
            }
        }

        return cols;
    }

    const toggleSortDirection = () => {
        setSortDirection((prevDirection) => (prevDirection === "ascending" ? "descending" : "ascending"));
    };

    const handleUploadSuccessChange = () => {
        setUploadSuccess(true);
    }

    return (
        <div>
            <CoachRequestNavbar 
            handleUploadSuccessChange={handleUploadSuccessChange}
            onSearch={(term) => setSearchTerm(term)}
            onSort={(key) => setSortKey(key)}
            sortKey={sortKey}
            onToggleSortDirection={toggleSortDirection}
            sortDirection={sortDirection}
            />
            <div className="container" style={{minHeight: "53em"}} >
                {createGrid(filteredAndSortedCoachList)}
            </div>
        </div>
    )
}

export default CoachRequest;