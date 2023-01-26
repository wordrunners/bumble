import axios from 'axios'

const authChecker = async(cookie: string) => {

  return await axios('https://ya-praktikum.tech/api/v2/auth/user', {
  
  headers: { 'Cookie': cookie}
  })
  .then(function (response) {
    if (response?.data?.id) {
      return true
    }
    else return false
  })
  .catch(function (error) {
    console.log(error);
    
    return false
  });
}

export default authChecker