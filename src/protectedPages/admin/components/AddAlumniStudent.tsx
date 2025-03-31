import { Toaster } from "sonner";
import { toast } from "sonner";
import { SignupAPI } from "@/api/services/authService";
import { handleApiError } from "@/api/utils/apiUtils";
function AddAlumntStudent(){
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const enrollment = formData.get("enrollment") as string;
        const dob = formData.get("dob") as string;
        const role = formData.get("alumni-student") as string;
        if (!name || !email || !enrollment || !dob || !role) {
            toast.error("Please fill all the fields");
            return;
        }
        try{
            const response = await SignupAPI({username:enrollment, email:email, password:enrollment, isAlumni:role === "alumni"});
            toast.success("User added successfully");
        }
        catch(e){
            const error = handleApiError(e);
            toast.error(error.message);
        }
        

        console.log(name, email, enrollment, dob, role);
    }
    return (
        <section className="p-5 max-w-[1095px] mx-auto">
            <form onSubmit={handleSubmit} className="border-4 p-5 text-center flex flex-col gap-5">
                
                <div className="flex flex-col">
                    <label className="text-xl" htmlFor="name">Name</label>
                    <input id="email" name="email" className="border-2 rounded-2xl px-2 py-1" type="text" />
                </div>
                <div className="flex flex-col">
                    <label className="text-xl" htmlFor="email">Email</label>
                    <input id="enrollment" name="enrollment" className="border-2 rounded-2xl px-2 py-1" type="text" />
                </div>
                <div className="flex flex-col">
                    <label className="text-xl" htmlFor="enrollment">Enrolment Number</label>
                    <input id="name" name="name" className="border-2 rounded-2xl px-2 py-1" type="text" />
                </div>
                <div className="flex flex-col">
                    <label className="text-xl" htmlFor="dob">Date of Birth</label>
                    <input id="dob" name="dob" className="border-2 rounded-2xl px-2 py-1" type="date" />
                </div>
                <div className="flex flex-col">
                    <label className="text-xl" >Role</label>
                    <div className="flex gap-5 border-2 justify-center rounded-2xl px-2 py-1">
                        <label className="text-xl" htmlFor="alumni">
                            <input id="alumni" name="alumni-student" className="border-2 rounded-2xl px-2 py-1" type="radio" value="alumni"/>
                            Alumni
                        </label>
                        <label className="text-xl" htmlFor="student">
                            <input id="student" name="alumni-student" className="border-2 rounded-2xl px-2 py-1" type="radio" value="student"/>
                            Student
                        </label>
                    </div>
                </div>
                <button className="p-2 border-1 rounded-xl bg-gradient-to-r from-red-400 to-orange-400 text-white">Submit</button>
                <Toaster />
            </form>
        </section>
    )
}
export default AddAlumntStudent;