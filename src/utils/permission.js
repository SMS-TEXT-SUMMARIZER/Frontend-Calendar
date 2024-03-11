import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const requestSmsPermissions = async () => {
    try {
      const readPermission = await request(PERMISSIONS.ANDROID.READ_SMS);
      const writePermission = await request(PERMISSIONS.ANDROID.WRITE_SMS);
      const sendPermission = await request(PERMISSIONS.ANDROID.SEND_SMS);

      if (
        readPermission === RESULTS.GRANTED &&
        writePermission === RESULTS.GRANTED &&
        sendPermission === RESULTS.GRANTED
      ) {
        // Permissions granted, proceed with your code logic
        console.log('SMS permissions granted');
      } else {
        // Permissions not granted, handle accordingly
        console.log('SMS permissions not granted');
      }
    } catch (error) {
      console.error('Error requesting SMS permissions:', error);
    }
  };


export default requestSmsPermissions