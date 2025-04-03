
import { useNavigate } from "react-router-dom";
import {Payment} from './data-table/columns'
function AlumniNavigate({data}:{data:Payment}) {
  const navigate = useNavigate();

  const handleConnect = (data: Payment) => {
    navigate(`/alumni/${data.id}`);
  };

  return (
    <button
      onClick={()=>handleConnect(data)}
        className="px-4 py-2 bg-[#95323d]  w-full text-white rounded hover:bg-red-600  flex-wrap"
      >
        Connect
    </button>
  );
}
export default AlumniNavigate;