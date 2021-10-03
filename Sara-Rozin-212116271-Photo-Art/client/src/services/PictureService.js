const API_URL = "http://localhost:8080/api";
//Returns pictures  from the database
export function getPicturesList() {
  return fetch(`${API_URL}/picture/all`).then((res) => res.json());
}

//Filters pictures  from the database and return them 
export function filterPictures(filter) {
  return fetch(`${API_URL}/picture/findCond?${filter}`)
    .then((res) => res.json())
    .then((p) => {
      if (!p.length) { return []; }
      else {
        return p;
      }
    });
}


