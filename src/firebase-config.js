const firebaseConfig = {
    apiKey: "AIzaSyAdchUuDKJOWeHu8yh9iH61gAxpcckNFEw",
    authDomain: "quizsem-12.firebaseapp.com",
    databaseURL: "https://quizsem-12-default-rtdb.firebaseio.com",
    projectId: "quizsem-12",
    storageBucket: "quizsem-12.appspot.com",
    messagingSenderId: "890518524033",
    appId: "1:890518524033:web:ddb2d801fb3cd32699fd80"
  };

export function getFirebaseConfig(){
    if (!firebaseConfig || !firebaseConfig.apiKey){
        throw new Error("Firebase configuration error");
    } else {
        return firebaseConfig;
    }
}
