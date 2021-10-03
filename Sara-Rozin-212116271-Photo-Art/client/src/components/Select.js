
import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { filterPictures } from '../services/PictureService';
import "./selectPictures.css";
//display selected pictures
const SelectPictures = (props) => {
   //init array ot colors
   const colors = [
      { value: "אדום" },
      { value: "אפור" },
      { value: "לבן" },
      { value: "כחול" },
      { value: "ירוק" },
      { value: "ורוד" },
      { value: "זהב" },
      { value: "צהוב" },
      { value: "כתום" },
      { value: "סגול" },
      { value: "חום" }
   ];
//init array ot typs
   const typs = [
      { value: "תמונות לחדר ילדים" },
      { value: "פרחים" },
      { value: "תמונות טבע" },
      { value: "תמונות לסלון" },
      { value: "תמונות נוף" },
      { value: "תמונות זכוכית" },
   ];
   //init array ot prices
   const prices = [
      { value: 500 },
      { value: 700 },
      { value: 1000 },
      { value: 1500 },
      { value: 2000 },
   ];
   const [picturesFilter, setPicturesFilter] = useState(props.pictures);
   const [color, setColor] = useState(null);
   const [type, setType] = useState(null);
   const [price, setPrice] = useState(null);
   const [notFound, setNotFound] = useState(null);
   const [currentColor, setCurrentColor] = useState(null);
   const [currentType, setCurrentType] = useState(null);
   const [currentPrice, setCurrentPrice] = useState(null);
   //change current color
   const onchangeSelectByColor = (item) => {
      setCurrentColor(null);
      setColor(item);
   };
    //change current type
   const onchangeSelectByType = (item) => {
      setCurrentType(null);
      setType(item);
   };
    //change current price
   const onchangeSelectByPrice = (item) => {
      setCurrentPrice(null);
      setPrice(item);
   };
   //filter the pictures
   useEffect(() => {
      if (color && type && price) {
         filterPictures(`pictureColor=${color.value}&pictureType=${type.value}&picturePrice=${price.value}`).then(res => {
            {
               setPicturesFilter(res);
               props.updatePictures(res)
            }
         })
      }
      else {
         if (color && type) {
            filterPictures(`pictureColor=${color.value}&pictureType=${type.value}`).then(res => {
               setPicturesFilter(res);
               props.updatePictures(res)
            })
         }
         else {
            if (color && price) {
               filterPictures(`pictureColor=${color.value}&picturePrice=${price.value}`).then(res => {
                  setPicturesFilter(res);
                  props.updatePictures(res)
               })
            }
            else {
               if (type && price) {
                  filterPictures(`pictureType=${type.value}&picturePrice=${price.value}`).then(res => {
                     setPicturesFilter(res);
                     props.updatePictures(res)
                  })
               }
               else {
                  if (color) {
                     filterPictures(`pictureColor=${color.value}`).then(res => {
                        setPicturesFilter(res);
                        props.updatePictures(res)
                     })
                  }
                  else {
                     if (type) {
                        filterPictures(`pictureType=${type.value}`).then(res => {
                           setPicturesFilter(res);
                           props.updatePictures(res)
                        })
                     }
                     else {
                        if (price) {
                           filterPictures(`picturePrice=${price.value}`).then(res => {
                              setPicturesFilter(res);
                              props.updatePictures(res)
                           })
                        }
                     }
                  }
               }
            }
         }
      }
   }, [color, type, price])
   return (
      <>
      {/* Displays select buttons */}
         <div className="select">
            <Select id="selectByColor"
               value={color}
               onChange={onchangeSelectByColor}
               options={colors}
               getOptionValue={(color) => color.value}
               getOptionLabel={(color) => color.value}
               placeholder="לפי צבע"
            />
         </div>
         <div className="select">
            <Select id="selectByType"
               value={type}
               onChange={onchangeSelectByType}
               options={typs}
               getOptionValue={(type) => type.value}
               getOptionLabel={(type) => type.value}
               placeholder="לפי נושא"
            />
         </div>
         <div className="select">
            <Select id="selectByPrice"
               value={price}
               onChange={onchangeSelectByPrice}
               options={prices}
               getOptionValue={(price) => price.value}
               getOptionLabel={(price) => price.value}
               placeholder="לפי מחיר"
            />
         </div>
      </>
   );
};

export default SelectPictures;