function singleUser(id = 1) {
  let apiUrl = `https://reqres.in/api/users/${id}`;

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const user = data.data;
      return user;
    })
    .catch((error) => console.log(error));
}

export default singleUser;
