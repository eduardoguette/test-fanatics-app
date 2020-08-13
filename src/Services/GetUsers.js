function GetUsers(pagina = 1) {
  let apiUrl = `https://reqres.in/api/users/?page=${pagina}`;

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const users = data.data;
      return users;
    })
    .catch((error) => console.log(error));
}

export default GetUsers;
