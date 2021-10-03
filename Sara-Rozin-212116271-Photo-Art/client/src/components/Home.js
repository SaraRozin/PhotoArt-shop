import React, { useState, useEffect } from 'react';
import "./home.css";
import leftArrow from "../images/left-arrow.png";
import rightArrow from "../images/right-arrow.png";
import {getPicturesList} from "../services/PictureService";
//display home page
const Home = () => {
    const [images, setImages] = useState([]);
    const [indexImage, setIndexImage] = useState(0);
    const [flag, setFlag] = useState(true);
    //take all the pictures from the database to images array 
    useEffect(() => {
        var arryImages=["../images/pictures/SY201003-3537-768x432.jpg"];
        getPicturesList().then(res => {
           res.map(p=>arryImages.push("."+p.pictureSrcImage));
        })
        if(flag){
        setImages(arryImages)
        setFlag(false)
        }
    });
    //display the next image
    const nextImg = () => {
        if (indexImage === images.length-1)
            setIndexImage(0);
        else {
            setIndexImage(indexImage + 1);
        }
    }
    //display the prev image
    const prevImg = () => {
        if (indexImage === 0)
            setIndexImage(images.length-1);
        else
            setIndexImage(indexImage - 1);
    }
    return (
      
        <div id="image-head" class="image-head">
            <button className="prev" onClick={prevImg}><img className="rightArrow" src={leftArrow}></img></button>
            <img className="imageHome" src={images[indexImage]} />
            <button className="next" onClick={nextImg}><img className="leftArrow" src={rightArrow}></img></button>
        </div>
    );
}
export default Home;