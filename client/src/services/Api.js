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
}

export default new ApiService();
