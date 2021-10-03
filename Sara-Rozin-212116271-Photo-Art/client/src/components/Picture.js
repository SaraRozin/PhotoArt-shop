import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AddShoppingCart, RemoveShoppingCart } from '@material-ui/icons';
import { updateUserPicture } from '../services/UserPicturesService';
import FocusPicture from './FocusPicture'
import { useHistory } from "react-router-dom";
import focusImage from "../images/focus.png"
import "./picture.css"
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
});
//display a single picture
const Picture = (props) => {
    const history = useHistory();
    const classes = useStyles();
    //update the Cart of the user
    const updateCart = (countAdd) => {
        updateUserPicture(props.userId, props.picture._id,props.sizePicture, countAdd).then((res) => {
            props.updateCart()
        })
    };
    const [focus, setFocus] = useState(false);
    const [overPicture, setOverPicture] = useState(false);
    const focusPicture = () => {
        //Giving permission to focus an image to a logged-in user only 
        //A non-logged-in user is redirected to the login page
        if (localStorage.getItem("userId")) {
            setFocus(true)
            window.scrollTo(0, 0)
        }
        else
            history.push("./login")
    }
    return (
        <>
        {/* Displays the image as follows:
            If the user clicks focus on the image it's displayed in focus
            Otherwise if the image is in the shopping cart it is displayed in the shopping cart
            Otherwise the image is displayed in the catalog */}
            {focus ? <FocusPicture updateCart={props.updateCart} userId={props.userId} picture={props.picture} /> :
                props.isInCart ?
                    <div className="cardPictureCart">
                        <img className="imagePictureCart" src={props.picture.pictureSrcImage}></img>
                        <div className="details">
                            <p>מחיר: ₪{props.picture.picturePrice} </p>
                            <p>כמות: {props.countPicture}</p>
                            <p> {props.sizePicture} :גודל </p>
                        </div>
                        <button className="removeShoppingCart" onClick={() => { updateCart(-1) }}>
                            <RemoveShoppingCart />
                        </button>
                    </div> :
                    <div>
                        <div className="cardPicture">
                            {overPicture ?
                                <div className="overPicture">
                                    <button className="AddShoppingCart" >
                                        <img className="AddShoppingCartImageOver" src={focusImage}></img>
                                    </button>
                                </div>
                                : null}
                            <button className="imageButton" onClick={() => { focusPicture() }} onMouseOver={() => { setOverPicture(true) }} onMouseOut={() => { setOverPicture(false) }}>
                                <img className="imagePicture" src={props.picture.pictureSrcImage}></img>
                            </button>
                            <h2 className="cardContent">
                                {props.picture.pictureName}
                            </h2>
                            <button className="AddShoppingCart" onClick={() => { focusPicture() }}>
                                <img className="AddShoppingCartImage" src={focusImage}></img>
                            </button>
                        </div>
                    </div>
            }
        </>
    );
}
export default Picture