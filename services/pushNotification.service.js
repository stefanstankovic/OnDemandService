import PushNotification from 'react-native-push-notification';
import NotificationHandler, {
  configurePushNotifications,
} from './pushNotification.handler';
import {Actions} from 'react-native-router-flux';

export default class NotificationService {
  static Instance = null;

  socket = undefined;

  /**
   * @returns {NotificationService}
   */
  static getInstance() {
    if (NotificationService.Instance == null) {
      NotificationService.Instance = new NotificationService();
    }

    return this.Instance;
  }

  constructor() {}

  setListeners(onRegister, onNotification) {
    this.lastId = 0;
    this.lastChannelCounter = 0;

    NotificationHandler.attachRegister(onRegister);
    NotificationHandler.attachNotification(onNotification);

    configurePushNotifications(NotificationHandler);
    // Clear badge number at start
    PushNotification.getApplicationIconBadgeNumber(function(number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });
  }

  popInitialNotification() {
    PushNotification.popInitialNotification(notification =>
      console.log('InitialNotication:', notification),
    );
  }

  localNotif(notif) {
    this.lastId++;
    if (notif.userInteraction) {
      Actions.notificationsScreen();
      return;
    }
    PushNotification.localNotification({
      title: notif.title,
      message: notif.message,
      id: this.lastId,
      tag: 'local_notification',
    });
  }

  clearAllNotifications() {
    PushNotification.cancelAllLocalNotifications();
  }
}
