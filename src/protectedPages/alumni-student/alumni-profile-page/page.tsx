import { useParams } from "react-router-dom";
function AlumniProfilePage(){
    const { alumniId } = useParams();
    return (
        <div>
        <h1>Alumni Profile Page</h1>
        <p>Welcome to the alumni profile page!</p>
        <p>{alumniId}</p>
        </div>
    );
}
export default AlumniProfilePage;