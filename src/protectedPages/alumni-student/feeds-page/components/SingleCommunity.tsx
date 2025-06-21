import { Card,CardContent,CardTitle  } from "@/components/ui/card";


function SingleCommunity({id,name,description,setSelectedCommunities,selectedCommunities}: {id:string,name:string,description:string,setSelectedCommunities:React.Dispatch<React.SetStateAction<string[]>>,selectedCommunities:string[]}) {
    const selectCommunity = () => {
      setSelectedCommunities((prev:string[])=>{
        if (prev.includes(name)){
          return prev.filter((prevname:string)=>prevname!=name)
        }
        else{
          return [...prev,name]
        }
      })
    }
    return (

        <Card className={`w-full drop-shadow-lg cursor-pointer text-gray-800 hover:bg-gray-400 hover:text-white duration-200   ${(selectedCommunities && selectedCommunities.length>0 && selectedCommunities.includes(name)) ? "bg-red-800 text-white hover:bg-red-800" : ""}`} onClick={()=>{selectCommunity()}}>
          <div className="hidden">
            {id}
          </div>
          <CardContent className="p-4">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r ">{name}</CardTitle>
            <p className="mt-2 ">
              {description}
            </p>
            <div className="mt-4">
              {/* <Badge className="bg-gradient-to-r from-red-700 to-orange-800 py-1 px-2 text-md">Join</Badge> */}
            </div>
          </CardContent>
        </Card>
   
    )
}
export default SingleCommunity;