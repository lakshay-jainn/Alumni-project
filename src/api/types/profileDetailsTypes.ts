// export interface profileDetailsResponse{
//     profile:{
//         //common
//         email:string,
//         username:string,
//         userId:string,
//         image:string,
//         DOB:string,
//         batch:string,
//         name:string,
//         course:string,


//         //alumni
//         company?:string,
//         jobTitle?:string,

//         //student
//         skills?:string[],
//         internships?:String[],
//         urls?:String[]    
//     }

// }


export interface profileDetailsPayload {
    //common
    email?:string,
    username?:string,
    userId?:string,
    image?:string,
    DOB?:string,
    batch?:string,
    name?:string,
    course?:string,


    //alumni
    company?:string,
    jobTitle?:string,

    //student
    skills?:string[],
    internships?:String[],
    urls?:String[]    
}



export interface postUploadPayload {
    //common
    content?:string,
    caption?:string,
    communityId?:string,
}

export interface profileDetailsResponse {
    email:string,
    profileImage:string,
    username:string,
    profileCompletionPercentage:string | null,
    banner:string,
    basic:{
        gender:string,
        lastName:string,
        firstName:string,
        userType:string,
        course:string,
        courseSpecialization:string,
        mobile:string,

    },
    resume:string | null,
    about:string | null,
    skills:string[] | null,
    education:{
        id:{
            qualification:string,
            course:string,
            specialization:string,
            college:string,
            duration:{
                startYear:string,
                endYear:string,
            },
            courseType:string,
            percentage:string,
            cgpa:string,
            rollNumber:string,
        }
    },
    workExperience:{
        id:{
            
            designation:string,
            organisation:string,
            employmentType:string,
            startDate:string,
            endDate:string,
            currentlyWorking:boolean,
            location:string,
            remote:boolean,
            skills:string[],
            description:string,
        }
    },
    accomplishments:string | null,
    personalDetails:string | null,
    socialLinks:string | null,
}
