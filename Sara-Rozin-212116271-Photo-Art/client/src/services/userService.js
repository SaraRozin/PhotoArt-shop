const API_URL = "http://localhost:8080/api";
const API_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json",
};
//Adds user to the database
export function register(user) {
    return fetch(`${API_URL}/user/create`, {
        headers: API_HEADERS,
        method: "POST",
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
}
//Returns a user from the database
export function getUser(userName) {
    return fetch(`${API_URL}/user/findCond?userEmail=${userName}`)
        .then((res) => res.json()
        ).then(u => { console.log("u", u); return u ? u[0] : null })

}
