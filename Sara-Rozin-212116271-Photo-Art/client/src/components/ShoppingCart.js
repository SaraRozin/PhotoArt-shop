import React, { useEffect, useState } from 'react';
import { getUserPicturesList } from '../services/UserPicturesService';
import Pictures from './Pictures';
//import Paypal from "../paypal/Paypal";
import Paypal from "./PayPalButton";
import PayPalButton from './PayPalButton';
import { getPicturesList } from '../services/PictureService';
import "./shoppingCart.css";
//Displays user's shopping cart
const ShoppingCart = (props, history) => {
    const [userPictures, setUserPictures] = useState([])
    const [listPictures, setListPictures] = useState([])
    const [samPaymentUser, setSamPaymentUser] = useState(0)
    const [flag, setFlag] = useState(true)
    const data = { userId: props.userId, isCart: true, pictures: userPictures, updateCart: props.updateCart }
    if (flag) {
        if (props.userId) {
            //Takes the user's pictures from the dtabase
            var userId = JSON.parse(props.userId)
            getUserPicturesList(userId).then(res => {
                setUserPictures(res)
                setFlag(false)
            });
            getPicturesList().then(res => {
                setListPictures(res)
                setFlag(false)
            })
        }
    }
    useEffect(() => {
        //Calculates the total price per user
        if (userPictures && listPictures) {
            var price = 0;
            var item;
            userPictures.map(userPicture => {
                item = listPictures.find((picture) => picture._id === userPicture.pictureId)
                price += Object(item).picturePrice * userPicture.pictureCount
            })
            setSamPaymentUser(price)
        }
    }, [userPictures])
    return (
        <>
        {/* Displays shopping cart whith all the details */}
            <Pictures data={data} />
            <p className="samSale">{samPaymentUser} :סה"כ לתשלום</p>
            <Paypal history={history} total={samPaymentUser}/>
            {/* <PayPalButton /><span></span> */}
        </>
    );
}
export default ShoppingCart;
