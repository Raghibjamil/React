import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
//    console.log(userData.$id)
console.log('userData: (in PostForm component) ', userData)

    const submit = async (data) => {
       if (post) {
        {/**data.image[0] ? ... : null: This is a conditional ternary operator. It checks if data.image[0] exists and is truthy. If it does (meaning an image file is selected), it proceeds with the upload operation. If not (meaning no image file is selected), it sets file to null.

await appwriteService.uploadFile(data.image[0]): If data.image[0] exists, this line asynchronously uploads the selected image file using a function called uploadFile from the appwriteService. The await keyword is used to wait for the upload operation to complete before proceeding further. */}
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else { 
            const file = await appwriteService.uploadFile(data.image[0]);
            try{
                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    console.log('User data ID: ', userData.$id)
                    // console.log(userData)
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                    
    
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }catch (error) {
                console.log(error)
                await appwriteService.deleteFile(file.$id)
                // throw error
            }

           
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    {/**React.useEffect(() => { ... }, [watch, slugTransform, setValue]);:

This sets up a useEffect hook that will run when any of the dependencies (watch, slugTransform, setValue) change.
The function inside the useEffect hook will be executed after the component renders.
const subscription = watch((value, { name }) => { ... });:

This code subscribes to changes in the form's values. watch here seems to be a function that watches for changes in the form values and invokes a callback function whenever a change occurs.
if (name === "title") { ... }:

Inside the callback function provided to watch, it checks if the change occurred for the field named "title".
setValue("slug", slugTransform(value.title), { shouldValidate: true });:

If the change occurred for the "title" field, it updates the value of the "slug" field using setValue. It transforms the value of the "title" field using the slugTransform function before setting it as the value of the "slug" field.
The shouldValidate: true option indicates that validation should be triggered after setting the new value for the "slug" field.
return () => subscription.unsubscribe();:

This is the cleanup function of the useEffect hook. It unsubscribes from the subscription to prevent memory leaks when the component unmounts or when the dependencies change. */}

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {

                {/**This usage of setValue inside the useEffect hook subscribes to changes in the "title" field using the watch function. Whenever the "title" field changes, it updates the value of the "slug" field based on the transformed value of the "title" field using the slugTransform function.
This setup ensures that whenever the "title" field changes, the "slug" field is automatically updated accordingly. */}
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        {/**setValue: This function is provided by React Hook Form to dynamically set the value of form fields.

"slug": This is the name of the input field that you want to update. In this case, it seems to be a field related to a URL slug.

slugTransform(e.currentTarget.value): This part of the code appears to be a function call (slugTransform) that transforms the current value of the input field (e.currentTarget.value) in some way, presumably to generate a slug based on user input. The result of this transformation is then set as the new value of the input field.

{ shouldValidate: true }: This is an optional configuration object passed as the third argument to setValue. It specifies that validation should be performed after setting the new value. This means that any validation rules associated with the "slug" input field will be applied after the new value is set. */}


{/**Inside the onInput Event Handler:

This usage of setValue inside the onInput event handler of the "slug" field's <Input> component allows for dynamic updating of the "slug" field as the user types in the "slug" input field. */}

                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}

                 
                />
                {/**  { required: !post }. It suggests that the "image" field is required unless the post object exists (i.e., it's not a new post). */}
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}