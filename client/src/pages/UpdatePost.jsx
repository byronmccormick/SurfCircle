import { Button, FileInput, Select, TextInput, Alert, Label, RangeSlider } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase'
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function UpdatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const {postId} = useParams();
    const [formData, setFormData] = useState({_id: postId});
    const [publishError, setPublishError] = useState(null);
    const [stokeLevel, setStokeLevel] = useState("");
    const [surfRating, setSurfRating] = useState(0); 
    const navigate = useNavigate();
    const {currentUser} = useSelector((state)=> state.user)

    useEffect(()=>{
        try {
            const fetchPost = async () => {
                const res = await fetch(`/api/post/getposts?postId=${postId}`);
                const data = await res.json();
                if(!res.ok){
                    console.log(data.message);
                    setPublishError(data.message)
                }
                if(res.ok){
                    setPublishError(null);
                    setFormData(data.posts[0]);
                }
            }
            fetchPost();
        } catch (error) {
            console.log(error)
        }
    },[postId]);

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
            const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(!res.ok){
                setPublishError(data.message);
                return;
            }
            if(res.ok){
                setPublishError(null);
                navigate(`/post/${data.slug}`)
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
        if (rating >= 0 && rating <= 10) {
          setStokeLevel("Never surfing again");
        } else if (rating > 10 && rating < 30) {
          setStokeLevel("Not impressed");
        } else if (rating >= 30 && rating < 50) {
          setStokeLevel("It's alright");
        } else if (rating >= 50 && rating < 70) {
          setStokeLevel("Pretty good");
        } else if (rating >= 70 && rating < 80) {
          setStokeLevel("Feeling great");
        } else if (rating >= 80 && rating < 90) {
          setStokeLevel("Super stoked");
        } else if (rating >= 90 && rating <= 100) {
          setStokeLevel("Epic!");
        }
      };      
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextInput value={formData.title} type='text' placeholder="Title" required id='title' className="flex-1" onChange={(e)=> setFormData({...formData,title:e.target.value})}></TextInput>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <Select value={formData.region} className="flex-1" onChange={(e)=> setFormData({...formData,region:e.target.value})}>
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
                <TextInput value={formData.break} type='text' placeholder="Break" required id='break' className="flex-1" onChange={(e)=> setFormData({...formData,break:e.target.value})}></TextInput>
            </div>
            <div className="flex flex-col gap-4 md:flex-row justify-between">
                <TextInput value={formData.reportedSwell} type='text' placeholder="Reported wave height (meters)" required id='reportedSwell' className="flex-1" onChange={(e)=> setFormData({...formData,reportedSwell:e.target.value})}></TextInput>
                <TextInput value={formData.actualSwell} type='text' placeholder="Actual wave height (meters)" required id='actualSwell' className="flex-1" onChange={(e)=> setFormData({...formData,actualSwell:e.target.value})}></TextInput>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <Select value={formData.swellDirection} className="flex-1" onChange={(e)=> setFormData({...formData,swellDirection:e.target.value})}>
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
                <TextInput value={formData.buoyData} type='text' placeholder="Buoy data (meters)" id='buoyData' className="flex-1" onChange={(e)=> setFormData({...formData,buoyData:e.target.value})}></TextInput>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
                <Select value={formData.reportedWind} className="flex-1" onChange={(e)=> setFormData({...formData,reportedWind:e.target.value})}>
                    <option value="unknown">Reported wind...</option>
                    <option value="onshore">Onshore</option>
                    <option value="offshore">Offshore</option>
                    <option value="cross">Cross</option>
                </Select>
                <Select value={formData.actualWind} className="flex-1" onChange={(e)=> setFormData({...formData,actualWind:e.target.value})}>
                    <option value="unknown">Actual wind...</option>
                    <option value="onshore">Onshore</option>
                    <option value="offshore">Offshore</option>
                    <option value="cross">Cross</option>
                </Select>
                <Select value={formData.tide} className="flex-1" onChange={(e)=> setFormData({...formData,tide:e.target.value})}>
                    <option value="unknown">Tide...</option>
                    <option value="high">High</option>
                    <option value="mid">Mid</option>
                    <option value="low">Low</option>
                </Select>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
                <Select value={formData.duration} className="flex-2" onChange={(e)=> setFormData({...formData,duration:e.target.value})}>
                    <option value="unknown">Surf duration...</option>
                    <option value="0.5">30 minutes</option>
                    <option value="1">1 hour</option>
                    <option value="1.5">1 hour 30 minutes</option>
                    <option value="2">2 hours</option>
                    <option value="2.5">2 hours 30 minutes</option>
                    <option value="3">3 hours+</option>
                    <option value="noodled">Noodled</option>
                </Select>
                <TextInput value={formData.forecast} type='text' placeholder="Forecast source" required id='forecast' className="flex-1" onChange={(e)=> setFormData({...formData,forecast:e.target.value})}></TextInput>
            </div> 
            <div className="flex flex-col gap-4 justify-between items-center">
                <p className="text-center">Rate it</p>
                <input 
                    type="range" 
                    id="rating"
                    value={formData.rating} 
                    min="0" 
                    max="100" 
                    onChange={handleRatingChange} 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 range-slider"
                />
                <p className="text-center">{stokeLevel}</p>
            </div>
            <style jsx="true">{`
                input[type="range"].range-slider {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 8px;
                    border-radius: 5px;
                    background: linear-gradient(to right, #4caf50 0%, #4caf50 ${formData.rating}%, #d3d3d3 ${formData.rating}%, #d3d3d3 100%);
                    outline: none;
                    opacity: 0.7;
                    transition: opacity .2s;
                }
                input[type="range"].range-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    background: #4caf50;
                    cursor: pointer;
                }
                input[type="range"].range-slider::-moz-range-thumb {
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    background: #4caf50;
                    cursor: pointer;
                }
            `}</style>
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
            <ReactQuill value={formData.content} theme='snow' className="h-72 mb-12" placeholder="Write something..." required onChange={(value)=> {setFormData({...formData,content: value})}}></ReactQuill>
            <Button type='submit' gradientDuoTone='cyanToBlue'>Update post</Button>
            {
                publishError && <Alert className="mt-5" color='failure'>{publishError}</Alert>
            }
        </form>
    </div>
  )
}
