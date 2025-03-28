import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { useState,useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { profileDetailsPayload } from "@/api/types/profileDetailsTypes"
import { Input } from "@/components/ui/input"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useDropzone } from "react-dropzone";
import { useEffect } from "react"
import useFetchProfile from "@/api/hooks/useFetchProfile"
import { updateProfileDetails } from "@/api/services/profileService"
import { uploadImg } from '@/api/services/imageService'
import { ImagePlus } from "lucide-react";
import { toast,Toaster } from "sonner";

import useGlobalAuth from "@/Auth/useGlobalAuth";

//basically using zod for form validation. here i am defining how my form data should be . 
const profileFormSchema = z.object({  
  image: z
      //Rest of validations done via react dropzone
      .instanceof(File)
      // .refine((file) => file.size !== 0, "Please upload an image")
      .optional(),

  name:z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),


  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),


  DOB: z
  .string()
  .length(8, {message: "Date of birth must be exactly 8 digits (DDMMYYYY)"})
  .regex(/^\d{8}$/, {message: "Date of birth must be 8 digits"})
  .refine((val) => {
    const day = parseInt(val.slice(0, 2), 10);
    const month = parseInt(val.slice(2, 4), 10);
    const year = parseInt(val.slice(4, 8), 10);
    return (
      day >= 1 && day <= 31 &&
      month >= 1 && month <= 12 &&
      year >= 1900 && year <= 2099
    );
  }, {message:"Invalid date of birth"}),


  email: z
    .string()
    .email(),

})

//now i am assigning the defined restrictions above to a type
type ProfileFormValues = z.infer<typeof profileFormSchema>





export default function PersonalDetails() {
  const {token}=useGlobalAuth();
  //this is the image preview url :- which will be visible on the image upload
  const [preview, setPreview] = useState<string | ArrayBuffer | null>('');
  //inital fetch
  const [personalDetails,loading,error]=useFetchProfile();
  

  //useing the useform hook with type i defined above,also giving the initial default values before values fetch from api
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      username: "",
      DOB: "",
      email: "",
      image: new File([""], "filename"),
    },
    mode: "onBlur",
  });


  //upload functionality :- makes sure that uploaded image is shown to the user
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        form.setValue("image", acceptedFiles[0]);
        form.clearErrors("image");
      } catch (error) {
        setPreview(null);
        form.resetField("image");
      }
    },
    [form],
  );

  // some properties of upload functionality
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });


  //after initial fetch
  useEffect(() => {
    if (personalDetails) {
     
      const DOB=personalDetails.profile.DOB;
      const day = DOB.slice(0, 2);
      const month = DOB.slice(3, 5);
      const year = DOB.slice(6, 10);
      const formattedDOB = day+month+year;
      
      // here i am hydarating the form with the default values came from backend. if a user already have a name. it will show in that feild
      form.reset({
        name: personalDetails.profile.name,
        username: personalDetails.profile.username,
        DOB: formattedDOB,
        email: personalDetails.profile.email,
        image:new File([""], "filename"),
      });
      setPreview(personalDetails.profile.image)
    }
  }, [personalDetails, form]);

    
  

  //this ensures the dob is converted in the appropriate format and all the values are submitted to backend via update function
  async function onSubmit(data : ProfileFormValues) {
    const formattedDOB = `${data.DOB.slice(0, 2)}-${data.DOB.slice(2, 4)}-${data.DOB.slice(4, 8)}`;
    
    // Original fetched details for comparison
    const originalDetails = {
      name: personalDetails!.profile.name,
      username: personalDetails!.profile.username,
      DOB: personalDetails!.profile.DOB,
      email: personalDetails!.profile.email,
    };
    
    // Compare and find the changed fields
    const updatedFields: profileDetailsPayload = {};
    
    if (data.name !== originalDetails.name) {
      updatedFields.name = data.name;
    }
    if (data.username !== originalDetails.username) {
      updatedFields.username = data.username;
    }
    if (formattedDOB !== originalDetails.DOB) {
      if (originalDetails.DOB===""){
        updatedFields.DOB = formattedDOB;
      } else{
        toast.error("You can only update your date of birth once.")
        return
      }
    }
    if (data.email !== originalDetails.email) {
      updatedFields.email = data.email;
    }
 
    if (data.image && data.image.size !== 0){
      let profileImageUrl;
      try{
        const profileImage=await uploadImg('profileImg',data.image,"/handle-media/profile-generate-upload-signature");
        profileImageUrl=profileImage;
      }catch(e){
        if (e instanceof Error){
          toast.error(e.message)
          return;
        }
        toast.error(`${e}`)
        return;
      }
      
      updatedFields.image = profileImageUrl;
    }
    console.log(updatedFields)
    // If no fields were updated, avoid making an API call
    if (Object.keys(updatedFields).length === 0) {
      toast.info("No changes were made to the profile.");
      return;
    }
  
    // Send the updated fields to the backend
    try {
      await updateProfileDetails(updatedFields);
      toast.success("Profile updated successfully");
    } catch (error) {
      if (error instanceof Error){
        console.log(error.message);
      }
      toast.error("An error occurred while updating the profile");

      
    }
  }

    


  // during the api fetch
  if (loading) { return (<div>Loading</div>)};
  //if error in fetching
  if (!loading && error){return (<div>{error.toString()}</div>)};
  //successfully fetched
  if (!loading && !error){
    
    
  return (
  
      
    <Form {...form}>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/*Name field*/}

      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shaddcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*username field*/}

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your username which you used during signup. <span className="text-red-600">You can only change this once every 30 days.</span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*Email field*/}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shaddcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*Date of birth field. i have used shadcn's inputOTP component because it looks neat*/}

        <FormField
          control={form.control}
          name="DOB"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl >
              <InputOTP    containerClassName={cn("flex-wrap")} maxLength={8} {...field} onChange={(value) => field.onChange(value)}
          onBlur={() => form.trigger("DOB")} >
              
                    <InputOTPGroup>
                      <InputOTPSlot className="max-w-8 max-h-8 xs:max-w-full xs:max-h-full" index={0} />
                      <InputOTPSlot className="max-w-8 max-h-8 xs:max-w-full xs:max-h-full" index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot className="max-w-8 max-h-8 xs:max-w-full xs:max-h-full" index={2} />
                      <InputOTPSlot className="max-w-8 max-h-8 xs:max-w-full xs:max-h-full" index={3} />
                    
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot className="max-w-8 max-h-8 xs:max-w-full xs:max-h-full" index={4} />
                      <InputOTPSlot className="max-w-8 max-h-8 xs:max-w-full xs:max-h-full" index={5} />
                      <InputOTPSlot className="max-w-8 max-h-8 xs:max-w-full xs:max-h-full" index={6} />
                      <InputOTPSlot className="max-w-8 max-h-8 xs:max-w-full xs:max-h-full" index={7} />
                    </InputOTPGroup>
                </InputOTP>
                
              </FormControl>
              <FormDescription>
                This is your Date of Birth. <span className="text-red-600">You cannot edit this field after updation</span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


         <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="md:w-max">
              <FormLabel
                className={`${
                  fileRejections.length !== 0 && "text-destructive"
                }`}
              >
                <h2 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Upload your image
                  <span
                    className={
                      form.formState.errors.image || fileRejections.length !== 0
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }
                  ></span>
                </h2>
              </FormLabel>
              <FormControl>
                <div
                  {...getRootProps()}
                  className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-8 shadow-sm shadow-foreground"
                >
                  {preview && (
                    <img
                      src={preview as string}
                      alt="Uploaded image"
                      className="max-h-[300px] rounded-lg"
                    />
                  )}
                  <ImagePlus
                    className={`size-40 ${preview ? "hidden" : "block"}`}
                  />
                  <Input {...getInputProps()} type="file" />
                  {isDragActive ? (
                    <p>Drop the image!</p>
                  ) : (
                    <p>Click here or drag an image to upload it</p>
                  )}
                </div>
              </FormControl>
              <FormMessage>
                {fileRejections.length !== 0 && (
                  <p>
                    Image must be less than 1MB and of type png, jpg, or jpeg
                  </p>
                )}
              </FormMessage>
            </FormItem>
          )}
        />
        

        <Toaster />
        <Button disabled={form.formState.isSubmitting} type="submit">Update profile</Button>
      </form>
    </Form>
   
  )
}
}



