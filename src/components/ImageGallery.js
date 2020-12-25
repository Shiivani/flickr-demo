import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import CardColumns from 'react-bootstrap/CardColumns'

const ImageGallery =(props)=>{
    // const [images,setImages] = useState();

    // useEffect(() => {
    //     if(props.imageResponse){
    //         setImages(props.imageResponse)
    //     }
    // }, [props.imageResponse]);  

    // console.log(images)

    return(
        <div className="masonry-with-columns-2">
        {props.imageResponse.map((photo, index) => {
        return (
          <div key={'photo-wrapper' + index.toString()}>
            <img key={'photoimg' + index.toString()} alt="profile-icon" src={photo.thumb.thumb}/>
            <div key={'card-body' + index.toString()}>
              <p key={'owner' + index.toString()}>{photo.photoinfo.ownername}</p>
              <p key={'title' + index.toString()}>{photo.photoinfo.title}</p>
              <p key={'photodesc' + index.toString()}>{photo.thumb.title}</p>
            </div>
          </div>
        )
      })}
        </div>
    )
}

export {ImageGallery};