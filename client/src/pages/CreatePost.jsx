import { Button, FileInput, Select, TextInput, Alert } from "flowbite-react";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase'
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate} from 'react-router-dom'

export default function CreatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [stokeLevel, setStokeLevel] = useState("Chillen");
    const [surfRating, setSurfRating] = useState(5); 
    const [publishError, setPublishError] = useState(null);

    const navigate = useNavigate();

    const handleUploadImage = async () => {
        try {
            if(!file){
                setImageUploadError('Please select an image');
                return;
            }
            setImageUploadError(null)
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage,fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot)=> {
                    const progress = 
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({...formData, image: downloadURL});
                    })
                }
            );
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
            console.log(error)
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/post/create',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(!res.ok){
                setPublishError(data.message)
                return;
            }
            if(res.ok){
                setPublishError(null);
                navigate(`/post/${data.post.slug}`)
            }
        } catch (error) {
            setPublishError('Something went wrong.')
        }
    };
    const handleRatingChange = (e) => {
        const value = parseInt(e.target.value);
        setSurfRating(value);
        updateStokeLevel(value);
        setFormData({...formData,rating:e.target.value})
    };

    const updateStokeLevel = (rating) => {
        if (rating == 0) {
            setStokeLevel("Never surfing again");
        }else if (rating >= 1 && rating < 3) {
            setStokeLevel("Meh");
        } else if (rating >= 3 && rating < 5) {
            setStokeLevel("Meh+");
        } else if (rating >= 5 && rating < 7) {
            setStokeLevel("Chillen");
        } else if (rating >= 7 && rating < 8) {
            setStokeLevel("Stoked");
        } else if (rating == 8) {
            setStokeLevel("Stoked+");
        } else if (rating > 9){
            setStokeLevel("Epic");
        }
    };
  return (
    <div className="p-3 max-w-6xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Create a log</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextInput type='text' placeholder="Title" required id='title' className="flex-1" onChange={(e)=> setFormData({...formData,title:e.target.value})}></TextInput>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <Select className="flex-1" onChange={(e)=> setFormData({...formData,region:e.target.value})}>
                    <option value="unknown">Region...</option>
                    <option value="northland">Northland</option>
                    <option value="auckland">Auckland</option>
                    <option value="waikato">Waikato</option>
                    <option value="bay of plenty">Bay of Plenty</option>
                    <option value="gisborne">Gisborne</option>
                    <option value="hawkes bay">Hawke's Bay</option>
                    <option value="taranaki">Taranaki</option>
                    <option value="wellington">Wellington</option>
                    <option value="nelson">Nelson</option>
                    <option value="marlborough">Marlborough</option>
                    <option value="westcost">Westcost</option>
                    <option value="canterbury">Canterbury</option>
                    <option value="southland">Southland</option>
                </Select>
                <TextInput type='text' placeholder="Break" required id='break' className="flex-1" onChange={(e)=> setFormData({...formData,break:e.target.value})}></TextInput>
            </div>
            <div className="flex flex-col gap-4 md:flex-row justify-between">
                <TextInput type='text' placeholder="Reported wave height (meters)" required id='reportedSwell' className="flex-1" onChange={(e)=> setFormData({...formData,reportedSwell:e.target.value})}></TextInput>
                <TextInput type='text' placeholder="Actual wave height (meters)" required id='actualSwell' className="flex-1" onChange={(e)=> setFormData({...formData,actualSwell:e.target.value})}></TextInput>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <Select className="flex-1" onChange={(e)=> setFormData({...formData,swellDirection:e.target.value})}>
                    <option value="unknown">Swell direction...</option>
                    <option value="N">North</option>
                    <option value="NE">Northeast</option>
                    <option value="E">East</option>
                    <option value="SE">Southeast</option>
                    <option value="S">South</option>
                    <option value="SW">Southwest</option>
                    <option value="W">West</option>
                    <option value="NW">Northwest</option>
                </Select>
                <TextInput type='text' placeholder="Buoy data (meters)" id='buoyData' className="flex-1" onChange={(e)=> setFormData({...formData,buoyData:e.target.value})}></TextInput>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
                <Select className="flex-1" onChange={(e)=> setFormData({...formData,reportedWind:e.target.value})}>
                    <option value="unknown">Reported wind...</option>
                    <option value="onshore">Onshore</option>
                    <option value="offshore">Offshore</option>
                    <option value="cross">Cross</option>
                </Select>
                <Select className="flex-1" onChange={(e)=> setFormData({...formData,actualWind:e.target.value})}>
                    <option value="unknown">Actual wind...</option>
                    <option value="onshore">Onshore</option>
                    <option value="offshore">Offshore</option>
                    <option value="cross">Cross</option>
                </Select>
                <Select className="flex-1" onChange={(e)=> setFormData({...formData,tide:e.target.value})}>
                    <option value="unknown">Tide...</option>
                    <option value="high">High</option>
                    <option value="mid">Mid</option>
                    <option value="low">Low</option>
                </Select>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
            <Select className="flex-2" onChange={(e)=> setFormData({...formData,duration:e.target.value})}>
                <option value="unknown">Surf duration...</option>
                <option value="0.5">30 minutes</option>
                <option value="1">1 hour</option>
                <option value="1.5">1 hour 30 minutes</option>
                <option value="2">2 hours</option>
                <option value="2.5">2 hours 30 minutes</option>
                <option value="3">3 hours+</option>
                <option value="noodled">Noodled</option>
            </Select>
            <TextInput type='text' placeholder="Forecast source" required id='forecast' className="flex-1" onChange={(e)=> setFormData({...formData,forecast:e.target.value})}></TextInput>
            </div>
            <div className="flex flex-col gap-4 justify-between items-center">
                <p className="text-center">Howz it?</p>
                <input 
                    type="range" 
                    id='rating'
                    value={surfRating} 
                    min="0" 
                    max="10" 
                    onChange={handleRatingChange} 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <p className="text-center">{stokeLevel}</p>
            </div>
            <div className="flex gap-4 items-center justify-between border-4 border-emerald-600 border-dotted p-3">
                <FileInput type='file' accept='image/*' onChange={(e)=>setFile(e.target.files[0])}></FileInput>
                <Button type='button' gradientDuoTone='cyanToBlue' size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}>
                    {
                        imageUploadProgress ? (
                            <div className="w-16 h-16">
                                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`}></CircularProgressbar>
                            </div>
                        ) : (
                            'Upload Image'
                        )
                    }
                </Button>
            </div>
            {imageUploadError && (<Alert color='failure'>{imageUploadError}</Alert>)}
            {formData.image && (<img src={formData.image} alt='upload' className='w-full h-72 object-cover'></img>)}
            <ReactQuill theme='snow' className="h-72 mb-12" placeholder="Describe your surf..." required onChange={(value)=> {setFormData({...formData,content: value})}}></ReactQuill>
            <Button type='submit' gradientDuoTone='cyanToBlue'>Publish</Button>
            {
                publishError && <Alert className="mt-5" color='failure'>{publishError}</Alert>
            }
        </form>
    </div>
  )
}
