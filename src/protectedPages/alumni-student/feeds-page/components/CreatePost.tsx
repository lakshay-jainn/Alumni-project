import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import { z } from "zod"
import { useState,useCallback,useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { createPost, FetchCommunities } from "@/api/services/feedsService"
import { uploadImg } from "@/api/services/imageService"
import { Input } from "@/components/ui/input"
import { useDropzone } from "react-dropzone";
import { ImagePlus,CircleX,UsersRound } from "lucide-react";
import { toast } from "sonner";
import { postUploadPayload } from "@/api/types/profileDetailsTypes"
import { handleApiError } from "@/api/utils/apiUtils"


const profileFormSchema = z
  .object({
    image: z.instanceof(File).optional(),
    // Mark text as optional here and handle its validation later
    name: z.string().optional(),
    community:z.string(),
  })
  .superRefine((data : any, ctx : any) => {
    // Check if neither image is provided nor text meets the minimum length
    if (data.image.size <=0 && (!data.name || data.name.trim().length < 2 || data.name.trim().length > 100)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either an image must be uploaded or Caption (Max: 100 characters) must be provided.",
        // You can assign the error to the "name" field or create a general error.
        path: ["name"],
      });
    }
  });
  //now i am assigning the defined restrictions above to a type
  type ProfileFormValues = z.infer<typeof profileFormSchema>


export default function CreatePost({setCreatePostModal = ()=>{},setFetchAgain} : {setCreatePostModal?:(value:boolean)=>void,setFetchAgain:(value: (newValue : boolean)=>boolean )=>void}){
    const [preview, setPreview] = useState<string | ArrayBuffer | null>('');
    const inputFileRef = useRef<HTMLInputElement | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [communities,setCommunities] = useState([]);
    const [openChoser,setOpenChooser] = useState(false);
    const [selectedCommunity,setSelectedCommunity] = useState();
    const adjustHeight = () => {
      if (textareaRef.current) {
          textareaRef.current.style.height = "auto"; // Reset height to auto before measuring
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to content height
      }
  };
  const communityFetcher = async() =>{
    try{
      const res = await FetchCommunities();
      setCommunities(res)
    }
    catch(error){
      const errorMsg = handleApiError(error);
      toast.error(errorMsg.message);
      
    }

  }  
  useEffect(()=>{
    communityFetcher();
  },[])


    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
          name: "",
          image: new File([""], "filename"),

        },
        mode: "onSubmit",
      });

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
      
      const {
        // These are the props you need to pass to your dropzone component:
        getRootProps,
        getInputProps,
        isDragActive,
        fileRejections,
      } = useDropzone({
        onDrop,
        maxFiles: 1,
        maxSize: 5000000, // 1MB
        multiple: false,
        // Provide no‑op functions to satisfy the type requirements:
        onDragEnter: () => {},
        onDragOver: () => {},
        onDragLeave: () => {},
        accept: {
          "image/png": [".png"],
          "image/jpeg": [".jpg", ".jpeg"],
        },
      });

      const handleRemoveImage = () => {
        setPreview(null)
        form.resetField("image")
        if (inputFileRef.current) {
          inputFileRef.current.value = "" // Clear the input file element
        }
      }

    async function onSubmit(data : ProfileFormValues) {
            
            const updatedFields: postUploadPayload = {};
            if (data.image && data.image.size !== 0){
              // try{
              //   console.log(data.image)
              //   const response=await checkImageToxicity(acceptedFiles[0]);
              //   // toast.success(response)
              //   console.log(response)
              //   if(response.label ==='QUESTIONABLE' || response.label === 'UNSAFE' || (response.label === 'SAFE' && response.confidence < 90)){
              //     toast.error(`Image is offensive or inappropriate. \n\n    Label: ${response.label} Confidence Level: ${Math.floor(response.confidence)}%`)
              //     return
              //   }
              // } catch (error){
              //   const errorMessage=handleApiError(error)
              //   toast.error(errorMessage.message)
              //   return;
              // }

              let profileImageUrl;
              try{
                const profileImage=await uploadImg('posts',data.image,"/handle-media/feeds-generate-upload-signature");
                profileImageUrl=profileImage;
              }catch(e){
                if (e instanceof Error){
                  toast.error(e.message)
                  return;
                }
                toast.error(`${e}`)
                return;
              }
              
              updatedFields.content = profileImageUrl;
            }
            if (data.name) {
              updatedFields.caption = data.name;
            }
           
            updatedFields.communityId = data.community;
          
            // Send the updated fields to the backend
            try {
              await createPost({ ...updatedFields });
              toast.success("Post Created updated successfully");
              setCreatePostModal(false);
              setFetchAgain((prev : boolean) => !prev);
              form.reset();
              setOpenChooser(false)
              setSelectedCommunity(undefined)
              setPreview(null);

            } catch (error) {
              const errorMessage=handleApiError(error)
              toast.error(errorMessage.message);
        
              
            }
          }
    const CommunityChooser = ({communities=[]}) =>{
    return (
      <div className="w-full cursor-auto rounded-xl border-2 flex justify-center items-center">
        <div className="p-5 bg-white text-black flex flex-wrap gap-2 justify-center">
          {communities.map((community:any)=>(
            <button onClick={()=>{form.setValue("community",community.id);setSelectedCommunity(community.name)}} key={community.id} className={`p-2 rounded-2xl border-2 cursor-pointer hover:bg-red-800 hover:text-white hover:scale-110 transition-transform duration-300 ${community.name == selectedCommunity && "scale-110 bg-red-800 text-white"}`}>{community.name}</button>
          ))}
        </div>
      </div>
    );
  }
    return(
        
        <>
        <section className="rounded-2xl w-full mx-auto px-5 py-3 mb-5 border-2 bg-white">

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {/*Name field*/}
                    <div >
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                  <div className="p-2 border-1 rounded-lg">
                                    
                                      <textarea onInput={adjustHeight} placeholder="Share Without Hesitation" className="outline-none input-no-focus-shadow border-0 h-full w-full resize-none overflow-hidden bg-transparent" {...field} ref={textareaRef} />
                                 
                                  
                                  
                                    {preview && (
                                      <div className="relative w-fit mx-auto">
                                      <button onClick={handleRemoveImage} className="absolute left-full -translate-x-[120%] translate-y-[10%] bg-white rounded-full shadow-md aspect-square">
                                        <CircleX className="text-orange-500"/>
                                        
                                      </button>
                                    <img
                                        src={preview as string}
                                        alt="Uploaded image"
                                        className="max-h-[300px] rounded-lg"
                                    />
                                    </div>
                                    )}
              
                                    
                                    {isDragActive && (
                                    <p>Drop the image!</p>
                                    ) }
                                
                                  </div>
                                
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                    />

                    <div className="flex justify-between items-center  mt-2">
                    <div className="flex gap-4 items-center">
                    <FormField
                    control={form.control}
                    name="image"
                    render={() => (
                            <FormItem className="">
                                <FormControl>
                                <div {...getRootProps()} className="cursor-pointer  w-fit hover:bg-red-800 hover:text-white hover:scale-110 transition-transform duration-300 rounded-2xl p-2 border-2">
                                    <ImagePlus />
                                    <Input ref={inputFileRef} {...getInputProps()} type="file" />

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
                  <FormField
                    control={form.control}
                    name="community"
                    render={() => (
                            <FormItem className="flex gap-5 items-center">

                                <FormControl>
                                  <div className="flex items-center gap-2">
                                  <button className="flex items-center gap-2 cursor-pointer  w-fit border-2 rounded-2xl p-2 hover:bg-red-800 hover:text-white hover:scale-110 transition-transform duration-300" onClick={()=>setOpenChooser((prev)=>!prev)}><UsersRound className="inline" />Choose a tag</button>
                                  <FormMessage>
                               
                                  </FormMessage>
                                  
                                </div>
                                </FormControl>
                                
                            </FormItem>
                            )}
                    />
                    </div>
                    
                    <Button disabled={form.formState.isSubmitting} className="bg-red-800 hover:bg-[#7c2a32] rounded-full" type="submit">Post</Button>
                    </div>
                    
                    </div>
                    
                        

              
                    
                </form>
            </Form>
        
        </section>
        {openChoser && <CommunityChooser communities={communities} />}

        </>
    )
}




