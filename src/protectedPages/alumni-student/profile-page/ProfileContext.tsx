import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "@/api/axios/axiosClient";
import { handleApiError } from "@/api/utils/apiUtils";
import { profileDetailsResponse } from "@/api/types/profileDetailsTypes";

const ProfileContext = createContext<{
  profileDetails?: profileDetailsResponse;
  loading: boolean;
  error: any;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  profileDetails: undefined,
  loading: true,
  error: null,
setRefetch: () => {},
});

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profileDetails, setProfileDetails] = useState<profileDetailsResponse | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | any>(null);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosClient.get("/profile");
        setProfileDetails(res.data);
        console.log(res.data);
      } catch (error: any) {
        setError(handleApiError(error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [refetch]);

  return (
    <ProfileContext.Provider value={{ profileDetails, loading, error,setRefetch }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
