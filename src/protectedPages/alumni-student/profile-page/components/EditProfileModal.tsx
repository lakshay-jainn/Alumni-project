import { Dialog,DialogContent } from "@/components/ui/dialog";
import ProfileEditor from "./profileEditor";
import { profileDetailsResponse } from "@/api/types/profileDetailsTypes";
export default function EditProfileModal({editProfileModal,setEditProfileModal,activeSelection}: {editProfileModal:boolean,setEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>,activeSelection:"basic" | "resume" | "about" | "skills" | "education" | "work" | "accomplishments" | "personal" | "social"}) {
  return (
    <Dialog open={editProfileModal} onOpenChange={setEditProfileModal}>
        <DialogContent style={{borderRadius:0}} className="bg-[#f6f6f6] min-w-[80%] h-full rounded-none left-[100%] -translate-x-[100%] flex flex-col p-0 [&>button]:hidden">
            <div className="flex-1 overflow-y-scroll">
                <ProfileEditor setEditProfileModal={setEditProfileModal} activeSelection={activeSelection} />
            </div>
        </DialogContent>

     </Dialog >
  );
}