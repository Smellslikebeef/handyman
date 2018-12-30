import {users} from './users'
export function backend() {

  let pFetch = window.fetch;

  window.fetch = function (url, opts) {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
          let params = JSON.parse(opts.body);
          let filteredUsers = users.filter(user => {
            return user.username === params.username && user.password === params.password;
          });

          if (filteredUsers.length) {
            let user = filteredUsers[0];
            console.log(user)
            let responseJson = {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName
            };
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
          } else {
            reject('Username or password is incorrect');
          }

          return;
        }

        pFetch(url, opts).then(response => resolve(response));

      }, 500);
    });
  }
}