import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default async function registerForPushNotificationsAsync(agr, fish, water, anim, lang) {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  
  if (status !== 'granted') {
    alert('No notification permissions!');
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();

  var param = new Object();
  param.key = token;
  param.agr = agr;
  param.fish = fish;
  param.water = water;
  param.anim = anim;
  param.lang = lang;

  
  var data = new FormData();
  data.append("func", "setUser");
  data.append("data", JSON.stringify(param));

  return fetch('https://protege.spc.int/api.php', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: data,
    })
    .then((response) => response.json())
    .then((responseJson) => {
        // this.setState({
        //     isLoading: false,
        //     post: responseJson[0]
        // })
    })
    .catch((error) => {
        console.error(error);
    });
}