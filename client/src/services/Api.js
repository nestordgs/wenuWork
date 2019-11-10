import axios from 'axios';
import axiosCancel from 'axios-cancel';
// import store from '../store';

axiosCancel(axios);

axios.defaults.baseURL = 'http://localhost:5000/api/';

class ApiService {
  constructor() {
    this.requestId = '';
  }

  async login(credentials, requestId) {
    this.requestId = requestId;
    // eslint-disable-next-line no-return-await
    return await axios.post('/login', credentials, {
      requestId: this.requestId,
    });
  }

  async getCharacters(url, requestId, data = {}) {
    this.requestId = requestId;
    const params = Object.assign({
      requestId: this.requestId,
    }, data);

    // eslint-disable-next-line no-return-await
    return await axios.get(url, params);
  }
}

export default new ApiService();
