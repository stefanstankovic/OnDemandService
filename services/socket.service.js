import SocketIOClient from 'socket.io-client';
//import {AsyncStorage} from 'async-storage';

export default class SocketService {
  static Instance = null;

  socket = undefined;

  /**
   * @returns {SocketService}
   */
  static getInstance() {
    if (SocketService.Instance == null) {
      SocketService.Instance = new SocketService();
    }

    return this.Instance;
  }

  connectSocket(url, authToken) {
    if (!this.socket) {
      this.socket = SocketIOClient(url, {
        transports: ['websocket'],
        query: {
          token: authToken,
        },
        reconnectionDelay: 1000,
        reconnection: true,
        forceNew: true,
        reconnectionAttempts: Infinity,
        jsonp: false,
      });

      //await AsyncStorage.setItem('web-socket', this.socket);
    }
  }

  disconnetFromSocket() {
    this.socket.disconnect();
  }

  getSocket() {
    if (this.socket) {
      return this.socket;
    }
    /*
    try {
      let socket = await AsyncStorage.getItem('web-socket');
      if (socket !== null) {
        this.socket = socket;
      }
    } catch (ex) {
      this.socket = null;
    }
    */

    return this.socket;
  }
}
