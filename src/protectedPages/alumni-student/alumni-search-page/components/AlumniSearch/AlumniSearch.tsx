import './AlumniSearch.module.css';
import {columns,Payment} from '../data-table/columns.tsx'
import {getData} from '../data-table/fetchData.tsx'
import { DataTable } from "../data-table/DataTable.tsx"
import { useEffect, useState } from 'react';
import { Combobox } from '@/components/ui/combobox.tsx';
import AlumniListLoading from '../loading/AlumniListLoading.tsx';
function AlumniSearch(){

    const [data,setData]=useState<Payment[]>([]);
    const [loading,setLoading]=useState<boolean>(true)
    const [selectedBatches, setSelectedBatches] = useState<Array<any>>([]);
    const [selectedCourses, setSelectedCourses] = useState<Array<any>>([]);
    const [selectedInterests, setSelectedInterests] = useState<Array<any>>([]);
    
    
    useEffect(() => {
        const fetchData = async () => {
            const response : Payment[] = await getData();
            setData(response); 
            setLoading(false);
    };
        
        fetchData();

    }, []);


  

    if (loading) {
        return (
            <div className='flex justify-center items-center w-full'>
                <AlumniListLoading/>
            </div>
        )
    }
    if (data.length>0 && data ){
      const filteredData = 
      data.filter((alumnus) => {
         const matchesBatch =
             selectedBatches.length === 0 || selectedBatches.includes(alumnus.batch);
         const matchesCourse =
           selectedCourses.length === 0 || selectedCourses.includes(alumnus.course);
         const matchesInterest =
            selectedInterests.length === 0 || selectedInterests.includes(alumnus.jobtitle);
        
         return matchesBatch && matchesInterest && matchesCourse;
      });
         
      const uniqueBatches: Array<any> = [...new Set(filteredData.map((a) => a.batch))];
      const uniqueCourses: Array<any> = [...new Set(filteredData.map((a) => a.course))];
      const uniqueInterests:Array<any>  = [...new Set(filteredData.map((a) => a.jobtitle))];
        
    return(
       
        
        <div className='flex flex-col justify-center items-center w-full max-w-screen-2xl'>
        <div className="py-10 flex justify-center gap-5 items-center w-full px-5 flex-wrap">
            <Combobox
            placeholder='Batch'
          options={uniqueBatches}
          onChange={setSelectedBatches}
        />
        <Combobox
       placeholder='Course'
          options={uniqueCourses}
          onChange={setSelectedCourses}
        />
        <Combobox
        placeholder='Job Title'
          options={uniqueInterests}
          onChange={setSelectedInterests}
        />
        </div>
        <div className='w-full'>
            <DataTable columns={columns} data={filteredData} />
        </div>
        </div>
      
        
    );}
}

export default AlumniSearch;