import PushNotification from 'react-native-push-notification';

class NotificationHandler {
  onNotification(notification) {
    if (typeof this._onNotification === 'function') {
      this._onNotification(notification);
    }
  }

  onRegister(token) {
    if (typeof this._onRegister === 'function') {
      this._onRegister(token);
    }
  }

  onAction(notification) {
    if (notification.action === 'Yes') {
      PushNotification.invokeApp(notification);
    }
  }

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError(err) {
    console.log(err);
  }

  attachRegister(handler) {
    this._onRegister = handler;
  }

  attachNotification(handler) {
    this._onNotification = handler;
  }
}

const handler = new NotificationHandler();

export function configurePushNotifications(notificationHandler) {
  PushNotification.configure({
    onRegister: notificationHandler.onRegister.bind(notificationHandler),
    onNotification: notificationHandler.onNotification.bind(
      notificationHandler,
    ),
    onAction: notificationHandler.onAction.bind(notificationHandler),
    onRegistrationError: notificationHandler.onRegistrationError.bind(
      notificationHandler,
    ),
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
}

export default handler;
