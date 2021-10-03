
import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { updateUserPicture } from '../services/UserPicturesService';
import { useHistory } from "react-router-dom";
import "./focusPicture.css"
import "./selectPictures.css"
//focus picture
const FocusPicture = (props) => {
    const sizes = [
        { value: "50x30" },
        { value: "120x80" },
        { value: "190x27" },
        { value: "200x133" }
    ];
    const [flag, setFlag] = useState(true);
    const [error, setError] = useState('');
    const [size, setSize] = useState(null);
    const [currentSize, setCurrentSize] = useState(null);
    const history = useHistory();
    const onchangeSelectBySize = (item) => {
        setCurrentSize(null);
        setSize(item);
        setError("");
    };
    useEffect(() => {
        if (!flag) {
            props.updateCart()
            setFlag(false)
        }
    }, [props.picture]);
    //update Cart's details of the user in the database
    const updateCart = (countAdd) => {
       // Checks whether the user has entered the size of the image
       // and then directs it to the shopping cart, otherwise sends error message
        if (size) {
            updateUserPicture(props.userId, props.picture._id, size.value, countAdd).then((res) => {
                history.push("/shopping-cart");
            })
        }
        else {
            setError("!!!בחר גודל תמונה");
        }
    };
    return (
        //Displays the image whith focus
        <div className="focusPicture">
            <h1 className="titlePicture">{props.picture.pictureName}</h1>
            <p className="price">₪{props.picture.picturePrice}:מחיר</p>
            <div className="App">
                <Select id="selectBySize"
                    value={size}
                    onChange={onchangeSelectBySize}
                    options={sizes}
                    getOptionValue={(size) => size.value}
                    getOptionLabel={(size) => size.value}
                    placeholder="בחר גודל תמונה"
                />
            </div>
            <img className="focusImage" src={props.picture.pictureSrcImage}></img>
            <button className="yellowBtn" onClick={() => { updateCart(1) }}>הוספה לסל</button>
            {/* displays error message */}
            {error && <div className="errorMessage" >{error}</div>}
        </div>);
}
export default FocusPicture