import React, {useState, useEffect} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [nickname, setNickname] = useState();
  const [show, setShow] = useState();
  const [state, setState] = useState('');

  useEffect(() => {
    const firstLoad = async () => {
      try {
        const savedNickname = await AsyncStorage.getItem('@nickname');
        setNickname(savedNickname);
      } catch (err) {
        console.log(err);
      }
    };

    firstLoad();
  }, []);

  const saveNickname = async () => {
    setNickname(show);
    try {
      await AsyncStorage.setItem('@nickname', nickname);
    } catch (err) {
      console.log(err);
    }

    Keyboard.dismiss();
  };

  const removeNickname = async () => {
    setState('');
    try {
      await AsyncStorage.removeItem('@nickname');
      setNickname();
    } catch (err) {
      console.log(err);
    }
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Masukan Nama Kamu"
        style={styles.textInput}
        value={state}
        onChangeText={value => {
          setState(value);
          setShow(value);
        }}
      />

      <View style={styles.buttonContainer}>
        <Button title="Simpan" onPress={saveNickname} />
        <Button title="Hapus" onPress={removeNickname} />
      </View>

      {nickname ? (
        <Text style={styles.heading}>Hai {nickname}</Text>
      ) : (
        <Text style={styles.heading}>Belum Ada Nama </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginTop: 12,
  },
  textInput: {
    width: 300,
    marginVertical: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
  },
  buttonContainer: {
    width: 300,
    height: 100,
    display: 'flex',
    justifyContent: 'space-evenly',
  },
});
