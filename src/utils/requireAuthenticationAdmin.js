import { getCookies } from './getCookies';

export function requireAuthenticationAdmin(gssp) {
  return async (context) => {
    const { req, res } = context;
    // get Cookie
    // const getToken = (req, name) => {
    //   const value = `; ${req.headers.cookie}`;
    //   const parts = value.split(`; ${name}=`);
    //   if (parts.length === 2) return parts.pop().split(';').shift();
    // };
    const token = await getCookies(req, 'token');
    const resAvatar = await getCookies(req, 'avatar');
    const avatar = resAvatar.split('%').pop();
    const role = await getCookies(req, 'role');
    const idUser = await getCookies(req, 'idUser');

    res.avatar = avatar;
    res.role = role;
    res.idUser = idUser;
    if (!token) {
      // Redirect to login page
      return {
        redirect: {
          destination: '/login',
          statusCode: 302,
        },
      };
    }

    if (role !== 'admin') {
      return {
        redirect: {
          destination: '/',
          statusCode: 302,
        },
      };
    }

    return await gssp(context);
  };
}
