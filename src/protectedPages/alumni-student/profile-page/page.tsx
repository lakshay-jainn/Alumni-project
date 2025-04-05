import { ProfileProvider } from "./ProfileContext";
import ProfilePageWithoutContext from "./ProfileWithoutContext";
function ProfilePage() {
  return (
    <ProfileProvider>
        <ProfilePageWithoutContext />
    </ProfileProvider>
  );
}
export default ProfilePage;
// This component wraps the ProfilePageWithoutContext component with the ProfileProvider context.