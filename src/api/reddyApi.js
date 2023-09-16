import axios from 'axios'

const reddyApi = axios.create({
    baseURL: 'https://reddytech.com.co/api/index.php',
})

export default reddyApi;