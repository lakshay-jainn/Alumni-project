export interface AlumniRequest {
    userId: string
    name: string
    email: string
    enrolmentNumber: string
    DOB: string
    batch: string
    type: string
    status: string
    user: {
        id: string
        email: string
        name: string
        profileImage: string
        type: string
        createdAt: string
    }
  }