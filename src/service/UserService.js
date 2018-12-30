export default class UserService {
  static login(username, password) {

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    };

    return fetch(`/users/authenticate`, requestOptions)
        .then(response => {
          return response.text().then(text => {
            const data = text && JSON.parse(text)
            if (!response.ok) {
              if (response.status === 401) {
                this.logout()
                location.reload(true)
              }

              const error = (data && data.message) || response.statusText;
              return Promise.reject(error);
            }

            return data
          })
        })
        .then(user => {
          if (user) {
            user.authdata = window.btoa(username + ':' + password);
            localStorage.setItem('user', JSON.stringify(user));
          }

          return user;
        });
  }

  static logout() {
    localStorage.removeItem('user');
  }
}