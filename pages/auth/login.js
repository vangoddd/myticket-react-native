import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import auth from '@react-native-firebase/auth';
import {useValidation} from 'react-native-form-validator';

export default function Login({route, navigation, nav}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const {validate, getErrorMessages, isFormValid} = useValidation({
    state: {email, pass},
  });

  const handleLogin = () => {
    if (
      validate({
        email: {email: true, required: true},
        pass: {minlength: 3, required: true},
      })
    ) {
      console.log(email);
      auth()
        .signInWithEmailAndPassword(email, pass)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log(user.email);
        })
        .catch(error => console.log(error));
    } else {
      console.log('validation failed');
    }
  };

  const handleRegister = () => {
    navigation.push('Register');
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>MyTicket</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={pass}
          onChangeText={text => setPass(text)}
          style={styles.input}
        />
      </View>

      {!isFormValid() ? (
        <View>
          <Text style={styles.errorMsg}>{getErrorMessages()}</Text>
        </View>
      ) : null}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            handleLogin();
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleRegister();
          }}
          style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    paddingVertical: 30,
    fontFamily: 'Montserrat-Medium',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#2DC441',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 5,
  },
  buttonOutline: {
    backgroundColor: 'white',
    borderColor: '#2DC441',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
  buttonOutlineText: {
    color: '#2DC441',
    alignSelf: 'center',
  },
  errorMsg: {
    paddingTop: 15,
    color: 'red',
  },
});
