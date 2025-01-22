import './AlumniSearchPage.module.css';
import {columns} from './componentsFolder/data-table/columns.tsx'
import {getData} from './componentsFolder/data-table/fetchData.tsx'
import { DataTable } from "./componentsFolder/data-table/DataTable.tsx"
import { useEffect, useState } from 'react';
import { Payment } from './componentsFolder/data-table/columns.tsx';


function AlumniSearchPage(){
    const [data,setData]=useState<Payment[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response : Payment[] = await getData();
            setData(response); 
    };
        
        fetchData();
    }, []);

    
    if (data.length>0){
    return(
        <div className="container mx-auto py-10 flex justify-center">
             <DataTable columns={columns} data={data} />
        </div>
    );}
}

export default AlumniSearchPage;