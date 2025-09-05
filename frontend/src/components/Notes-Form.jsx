import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Input from "./Input";
import RTE from "./RTE";
import Button from "./Button";
import notesService from "../backend/notes";
import { useSelector } from "react-redux";

const NoteFrom = ({note}) => {

     const naviagate = useNavigate();
     const oldslug = note?note.slug : ""
    const {register,handleSubmit,control,watch,setValue,getValues} = useForm({
        defaultValues: {
            title : note?note.title : "",
            slug : note?note.slug : "",
            content : note?note.content : "",
        }
     })

     const token = useSelector((state) => state.auth.token);

     const submit = async (data) => {

        
        
        if(note && oldslug === data.slug) {
// uodate that note 
           
            
            const updateNote = await notesService.updateNote({...data,token});
            if(updateNote) naviagate(`/notes/${updateNote.slug}`);
        }
        else {
            console.log(`${oldslug}   ${data.slug}`);
            
            const object ={
                slug:oldslug,
                token:token
            }
            
            notesService.deleteNoteBySlug(object);
            
            const createNote  = await notesService.createNote({...data,token});
            if(createNote) naviagate(`/notes/${createNote.slug}`);
        }

     }

     const handleSlug = useCallback((value) => {
        if(value && typeof value === "string") {
            const slug = value.trim().toLowerCase().replace(/[^a-zA-Z0-9]+/g, "_").replace(/^-|-$/g, "");
           return slug;
        }

        return "";
    } , []);

    useEffect(() => {

        const subscription = watch((value , {name} ) => {
            if(name ==="title") {
                setValue("slug",handleSlug(value.title));
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    },[watch, handleSlug, setValue])
    
    
    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {note ? 'Edit Note' : 'Create New Note'}
                            </h1>
                            <p className="text-gray-600">
                                {note ? 'Make changes to your note and save when ready.' : 'Share your thoughts and ideas with the world.'}
                            </p>
                        </div>
                        <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span>Auto-saved</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(submit)} className="space-y-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-8">
                        {/* Title and Slug Section */}
                        <div className="space-y-6 mb-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Input
                                    label="Note Title"
                                    placeholder="Enter a compelling title for your note"
                                    {...register("title", { required: true })}
                                />
                                <Input
                                    label="URL Slug"
                                    placeholder="Auto-generated from title"
                                    disabled={true}
                                    {...register("slug", { required: true })}
                                    onInput={(e) => {
                                        setValue("slug", handleSlug(e.currentTarget.value), { shouldValidate: true });
                                    }}
                                />
                            </div>
                            
                            {/* Slug Preview */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="text-sm text-gray-600 mb-1">Preview URL:</div>
                                <div className="font-mono text-sm text-blue-600">
                                    /notes/{watch('slug') || 'your-note-slug'}
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-gray-700">
                                    Content
                                </label>
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                    <span>Rich text editor</span>
                                    <div className="flex items-center space-x-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Supports markdown</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <RTE 
                                    label="" 
                                    name="content" 
                                    control={control} 
                                    defaultValue={getValues("content")} 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Last saved: Just now</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            <Button 
                                type="button" 
                                variant="secondary"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                variant={note ? "success" : "primary"}
                                size="lg"
                                className="min-w-[120px]"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={note ? "M5 13l4 4L19 7" : "M12 6v6m0 0v6m0-6h6m-6 0H6"} />
                                </svg>
                                {note ? "Update Note" : "Create Note"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
    
}

export default NoteFrom;