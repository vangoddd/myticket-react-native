import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useValidation} from 'react-native-form-validator';
import auth from '@react-native-firebase/auth';

export default function Register({route, navigation}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [name, setName] = useState('');

  const {validate, getErrorMessages, isFormValid} = useValidation({
    state: {email, pass, name, confirmPass},
  });

  const handleRegister = () => {
    if (
      validate({
        name: {required: true},
        email: {email: true, required: true},
        pass: {minlength: 8, required: true},
        confirmPass: {equalPassword: pass},
      })
    ) {
      auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(userCred => {
          userCred.user.updateProfile({displayName: name});
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={text => {
            setName(text);
          }}
          style={styles.input}
        />
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
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPass}
          onChangeText={text => setConfirmPass(text)}
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
            handleRegister();
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
