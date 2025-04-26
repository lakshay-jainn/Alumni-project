import "./AlumniSearch.module.css";
import { columns } from "../data-table/columns.tsx";
import { AlumniSearchResponse } from "@/api/types/alumniSearchTypes.ts";
import { getData, getSearchData } from "../data-table/fetchData.tsx";
import { DataTable } from "../data-table/DataTable.tsx";
import { useEffect, useState, useMemo, useCallback } from "react";
import _ from "lodash";

function AlumniSearch() {
  const [data, setData] = useState<AlumniSearchResponse[]>([]);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<string | null>();
  const [page, setPage] = useState(1);
  const [alumnisExpanded, setAlumnisExpanded] = useState(false);
  const [skipAlumnis, setSkipAlumnis] = useState(0);
  

  const handleScroll = (e : any) => {
    const div = e.target;
    if (div.scrollHeight - 50 < div.scrollTop + div.clientHeight) {
      console.log("reached the end");
      setScrollLoading(true);
    }
  };

  const debouncedHandleScroll = useCallback(_.debounce(handleScroll, 500), [
    handleScroll,
  ]);

  useEffect(() => {
    const scrollDiv = document.querySelector(".scrollable-div-placeholder");
    if (!alumnisExpanded) {
      scrollDiv!.addEventListener("scroll", debouncedHandleScroll);
    } else {
      scrollDiv!.removeEventListener("scroll", debouncedHandleScroll);
    }

    // Clean up the event listener on component unmount
    return () => {
      scrollDiv!.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [alumnisExpanded, debouncedHandleScroll]);

  const loadMoreAlumnis = async () => {
    setSkipAlumnis((prev) => prev + 30);
    let responseData;
    if (searchParams){
      responseData = await getSearchData(searchParams,skipAlumnis+30,30)
    }
    else{
      responseData = await getData(skipAlumnis + 30 , 30);
    }

    const AlumnisFromDb = responseData;
    setScrollLoading(false);

    setData((prev) => [...prev, ...responseData]);

    if (AlumnisFromDb.length === 0) {
      setAlumnisExpanded(true);
    }
  };
  useEffect(()=>{
    console.log('page',page)
    if(page>1){
      loadMoreAlumnis();
    }
    
  },[page])
  useEffect(() => {
    console.log('scrollLoading',scrollLoading)
      if (scrollLoading == true) {
        setPage((prev)=>prev+1)
      }
    }, [scrollLoading]);


  const debouncedSetSearch = useMemo(
    () =>
      _.debounce((value: string) => {
        if (value) {
          setSearchParams(value);
        } else {
          setSearchParams(null);
        }
      }, 300),
    [setSearchParams]
  );



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSetSearch(value);
  };


  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);


  useEffect(() => {
    if (searchParams) {
      const fetchData = async () => {
        const response = await getSearchData(searchParams);
        setData(response);
      };
      fetchData();
    } else {
      const fetchData = async () => {
        const response: AlumniSearchResponse[] = await getData();
        setData(response);
      };
      fetchData();
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-screen-2xl">
      <div className=" flex justify-center gap-5 items-center w-full px-5 flex-wrap"></div>
      <div className="w-full border-1 mb-5 py-2 px-5 rounded-xl">
        <input
          onChange={handleChange}
          placeholder="Search for Alumni (Name / Course / Job Title / Batch)"
          className="w-full outline-none"
          type="search"
          name="asdfadsf"
          id=""
        />
      </div>
      <div className="w-full">
        {<DataTable columns={columns} data={data} />}
        {scrollLoading && <div>loading...</div>}
      </div>
    </div>
  );
}

export default AlumniSearch;
