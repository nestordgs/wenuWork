import axios from 'axios';
import axiosCancel from 'axios-cancel';
import store from '../store';

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

    const esc = encodeURIComponent;
    const queryMap = Object.keys(data)
      // eslint-disable-next-line array-callback-return
      .map((k) => {
        if (data[k]) {
          return `${esc(k)}=${esc(data[k])}`;
        }
        return '';
      })
      .filter(k => k !== '')
      .join('&');
    const newUrl = `${url}&${queryMap}`;
    // eslint-disable-next-line no-return-await
    return await axios.get(newUrl, params);
  }

  async getCharactersMultiple(url, requestId, data = {}) {
    this.requestId = requestId;
    const params = Object.assign({
      requestId: this.requestId,
    }, data);
    // eslint-disable-next-line no-return-await
    return await axios.get(url, params);
  }

  async get(url, requestId, data = {}) {
    this.requestId = requestId;
    const params = Object.assign({
      headers: {
        Authorization: `Bearer ${store.state.token}`,
      },
      requestId: this.requestId,
    }, data);

    // eslint-disable-next-line no-return-await
    return await axios.get(url, params);
  }

  async post(url, data, requestId) {
    this.requestId = requestId;
    // eslint-disable-next-line no-return-await
    return await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${store.state.token}`,
      },
      requestId: this.requestId,
    });
  }

  async delete(url, requestId) {
    this.requestId = requestId;
    // eslint-disable-next-line no-return-await
    return await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${store.state.token}`,
      },
      requestId: this.requestId,
    });
  }
}

export default new ApiService();
