import { Dialog,DialogContent,DialogHeader,DialogFooter } from "@/components/ui/dialog";
import ProfileEditor from "./profileEditor";
export default function EditProfileModal({editProfileModal,setEditProfileModal,activeSelection}: {editProfileModal:boolean,setEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>,activeSelection:"basic" | "resume" | "about" | "skills" | "education" | "work" | "accomplishments" | "personal" | "social"}) {
  return (
    <Dialog open={editProfileModal} onOpenChange={setEditProfileModal}>
        <DialogContent style={{borderRadius:0}} className="bg-[#f6f6f6] min-w-[80%] h-full rounded-none left-[100%] -translate-x-[100%] flex flex-col p-0">
            <div className="flex-1 overflow-auto">
                <ProfileEditor activeSelection={activeSelection} />
            </div>
        </DialogContent>

     </Dialog >
  );
}