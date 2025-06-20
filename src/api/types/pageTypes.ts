export interface DashboardResponse {
    connectionLength: number;
    yourNetworks: {
        postLength: number;
        followerLength: number;
        followingLength: number;
    };
    upComingEvents: Event[];
    profile: Profile;
}
export interface Profile {

        role: string;
        firstName: string;
        lastName: string;
        batch: string | null;
        course: string;
        courseSpecialization: string | null;
        profileImage: string | null;
}
export interface Event {
    id: string;
    title: string;
    description: string;
    time: string;
    location: string;
    importantLinks: string[];
    eventImage: string | null;
    eventData: string | null;
    createdAt: string;
}
export interface NotifResponse{
    id: string,
    name: string,
    action: string,
    description: string,
    url?: string,
    isRead: boolean,
    logo: string,
    createdAt:string
}
