
import { v4 as uuid } from "uuid";
const API_URL = "http://localhost:8080/api";
const API_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json",
};
//Returns user's pictures  from the database
export function getUserPicturesList(userId) {
    return fetch(`${API_URL}/userPicture/findCond?userId=${userId}`)
        .then((res) => res.json())
        .then((p) => {
            if (!p.length) { return []; }
            else {
                return p;
            }
        });
};
//Returns user's picture from the database 
export function getUserPictureList(userId, pictureId, pictureSize) {
    return fetch(`${API_URL}/userPicture/findCond?userId=${userId}&pictureId=${pictureId}&pictureSize=${pictureSize}`)
        .then((res) => res.json())
}
//Creates picture in the user's shoppingcart in the database
export function crt(userPicture) {
    return fetch(`${API_URL}/userPicture/create`, {
        headers: API_HEADERS,
        method: "POST",
        body: JSON.stringify(userPicture),
    })
        .then((res) => res.json());
}
//Updates picture in the user's shoppingcart in the database
export function upd(userPicture) {
    return fetch(`${API_URL}/userPicture/update?id=${userPicture.id}`, {
        headers: API_HEADERS,
        method: "PUT",
        body: JSON.stringify(userPicture),
    })
        .then((res) => res.json());
}
//Deletes picture in the user's shoppingcart in the database
export function del(id) {
    return fetch(`${API_URL}/userPicture/delete?id=${id}`, {
        headers: API_HEADERS,
        method: "DELETE",
    }).then((res) => res.json()).then(res => {
        return res
    });
}
//updates user's shoppingcart  in the database
export function updateUserPicture(userId, pictureId, pictureSize, countAdd) {
    var uId = JSON.parse(userId);
    return getUserPictureList(uId, pictureId, pictureSize).then((res) => {
        console.log("res", res, res.length)
        if (res.length !== 0) {
            if (res[0].pictureCount + countAdd <= 0) {
                del(res[0]._id);
            }
            else {
                upd({ id: res[0]._id, userId: res[0].userId, pictureId, pictureSize, pictureCount: res[0].pictureCount + countAdd });
            }

        } else {
            console.log("create")
            if (countAdd >= 1) {
                var uId = JSON.parse(userId);
                crt({ id: uuid(), userId: uId, pictureId, pictureSize, pictureCount: 1 });
            }
        }
    })
}