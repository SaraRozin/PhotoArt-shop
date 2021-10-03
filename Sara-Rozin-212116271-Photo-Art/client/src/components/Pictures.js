import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getPicturesList } from '../services/PictureService';
import Picture from './Picture'
import SelectPictures from './Select';
import "./pictures.css";
//display pictures
const Pictures = ({ ...props }) => {
    const [pictures, setPictures] = useState([])
    const [flag, setFlag] = useState(true)
    function updatePictures(newValue) {
        setPictures(newValue);
    }
    //Takes the pictures from the database 
    useEffect(() => {
        getPicturesList().then(res => {
            setPictures(res)
            setFlag(false)
        })
    }, [props.data.pictures])
    return (
        <>
        {/* Displays the pictures that are in the user's shopping cart */}
            {props.data.pictures ? props.data.pictures.map(p => (
                pictures ? pictures.filter(pi => pi._id == p.pictureId).map(pii => (
                    <Picture isInCart={true} userId={props.data.userId} key={p._id} picture={pii} sizePicture={p.pictureSize} countPicture={p.pictureCount} updateCart={props.data.updateCart} />
                )) : null
            ))
                :
                <div>
            {/* Displays the selected pictures */}
                    <div>
                    <SelectPictures updatePictures={updatePictures} updateCart={props.data.updateCart} />
                    </div>
                    <div id="hrBottom"></div>
                    <Grid className="katalog" container spacing={2} >
                        {pictures.length ? pictures.map((p) => (
                            <Grid item xs={2.1}>
                                <Picture userId={props.data.userId} key={p.id} picture={p} updateCart={props.data.updateCart} />
                            </Grid>
                        )) :
                            <h1 className="notFound">):לא נמצאו פריטים</h1>
                        }
                    </Grid>
                </div>}
        </>
    );
}
export default Pictures;
