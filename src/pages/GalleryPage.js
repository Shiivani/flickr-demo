import React,{useEffect,useState} from 'react';
import { ImageGallery } from '../components/ImageGallery';
import {Loading} from "../components/Loading"
import {useQuery} from '../assets/useQuery';
import {fetchData} from "../assets/useFetch";
import { useParams } from "react-router";
export default function  GalleryPage () {
  
  const {id} = useParams();
  const [imageResponse,setImageResponse] = useState([]);
  const { dataObj, setState } = useQuery(`https://www.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=709fcc16e682c7769f50ad7e15a754f1&group_id=${id}&per_page=20&page=1&format=json&nojsoncallback=1`);
  const fetchPhotos = async() => {
    if (dataObj.data['photos']['photo']) {
      let photoArr = dataObj.data['photos']['photo']
      for(let i in photoArr) {
        const photoUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.getContext&api_key=709fcc16e682c7769f50ad7e15a754f1&photo_id=${photoArr[i]['id']}&format=json&nojsoncallback=1`
        let photoThumb = await fetchData(photoUrl, 'GET')
        let thumbUrl = {thumb: photoThumb.prevphoto, photoinfo: photoArr[i]}
        if(thumbUrl?.thumb.media === 'photo'){
          setImageResponse(prevArray =>prevArray? [...prevArray, thumbUrl]:[thumbUrl])
        }
     }
    }
  }
  useEffect(() => {
    if(dataObj.loading===false && dataObj.data!=null){
      if(imageResponse===undefined || imageResponse.length===0)
      fetchPhotos()
    }
  }, [dataObj])

  useEffect(() => {
    if(id){
      setState({});
    }
  }, [])

  return <> {
    dataObj.loading || imageResponse === undefined ? <Loading/>:
  <ImageGallery imageResponse={imageResponse} />}</>
}