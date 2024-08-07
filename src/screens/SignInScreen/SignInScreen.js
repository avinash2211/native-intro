import {
  Text,
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Logo from "../../../assets/pic.jpg";
import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomInput/CustomButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkUsername, setCheckUsername] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const getData = async () => {
    try {
      const userName = await AsyncStorage.getItem('userName');
      if (userName !== '') {
       setCheckUsername(userName)
      }
      const password = await AsyncStorage.getItem('password');
      if (password !== '') {
       setCheckPassword(password);
      }
    } catch (e) {
      console.log()
    }
  };

  useEffect(() => { getData() }, []);
  
  const onSignInPressed = () => {
    console.warn("Sign In");
    //validate user
    console.log(username, password, checkUsername, checkPassword);
    if (username === checkUsername && password === checkPassword) {
      navigation.navigate("Home");
    }
  };
  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };
  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        <CustomButton text="Sign In" onPress={onSignInPressed} />
        <CustomButton
          text="Forgot Password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <SocialSignInButtons />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "80%",
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
