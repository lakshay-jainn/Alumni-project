import {toast} from 'sonner';
import { CreateCommunity } from "@/api/services/adminService"
import { handleApiError } from '@/api/utils/apiUtils';

export default function CreateCommunityPage(){
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)  => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const name = formData.get("name")!
        const description = formData.get("description")!

        try{
            const response = await CreateCommunity(name,description)
            toast.success(response.message)
        }
        catch(error){
            const errorMessage = handleApiError(error)
            toast.error(errorMessage.message)

        }

    }
    return (
        <div className="mx-auto p-10 text-center max-w-xl">
            <h1 className="text-4xl mb-5 font-bold">Create Community</h1>
            <form onSubmit={handleSubmit} className="border-4 rounded-xl flex flex-col gap-5 p-5">
                <label className="text-2xl" htmlFor="name">Community Name</label>
                <input name="name" id="name" className="rounded-lg border-2 px-10 py-5" type="text" required />
                <label className="text-2xl" htmlFor="description">Description</label>
                <textarea name="description" id="description" className="rounded-lg border-2 px-10 py-5"  required />
                <button className="bg-red-900 text-white rounded-xl py-5 text-2xl" type="submit">Add Community</button>
            </form>
        </div>
    )
}