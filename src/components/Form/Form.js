import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Colors} from '../../common/UIStylesCommon';
import {
  getDateFormatted,
  getTimeFormatted,
} from '../../common/helpers/dateFormatted';
import {isFormValid as isDateValid} from './Logic/validateForm';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';

const initialValues = {
  pacient: '',
  owner: '',
  phoneNumber: '',
  date: new Date(),
  symptoms: '',
};

export const Form = ({AddDate}) => {
  //#region states
  const [formValues, setFormValue] = useState(initialValues);
  const {date} = formValues;
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  //#endregion states

  //#region handlers
  const handleChangeDateTimePicker = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setFormValue({
      ...formValues,
      date: currentDate,
    });
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handleAdd = () => {
    const {result: areFormValuesValid, error} = isDateValid(formValues);
    const errorIsEmpty = error.trim().length <= 0;
    if (areFormValuesValid && errorIsEmpty) {
      const newDate = {
        ...formValues,
        id: nanoid(10),
      };
      AddDate(newDate);
      setFormValue(initialValues);
    } else {
      Alert.alert('Agregar nueva cita', error, [{text: 'Aceptar'}]);
    }
  };
  //#endregion handlers

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.titleForm}>Agregar nueva cita</Text>
        </View>
        <View>
          <Text style={styles.label}>Nombre de mascota:</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="default"
            placeholder="Ingrese el nombre de la mascota"
            onChangeText={(text) =>
              setFormValue({
                ...formValues,
                pacient: text,
              })
            }
          />
        </View>
        <View>
          <Text style={styles.label}>Nombre del propietario:</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="default"
            placeholder="Ingrese el nombre del propietario"
            onChangeText={(text) =>
              setFormValue({
                ...formValues,
                owner: text,
              })
            }
          />
        </View>
        <View>
          <Text style={styles.label}>Teléfono de contacto:</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="phone-pad"
            placeholder="Ej. 555-5555555"
            onChangeText={(text) =>
              setFormValue({
                ...formValues,
                phoneNumber: text,
              })
            }
          />
        </View>
        <Text style={styles.label}>Fecha:</Text>
        <View>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.textInputCalendar}
              editable={false}
              value={getDateFormatted(date)}
            />
            <TouchableHighlight
              style={styles.btnCalendar}
              onPress={showDatepicker}
              underlayColor={Colors.Icons.Secondary}>
              <Text style={styles.txtAdd}>+</Text>
              {/*//Colocar el simbolo de un calendario*/}
            </TouchableHighlight>
          </View>
          {show && (
            <DateTimePicker
              value={date}
              mode={mode}
              is24Hour={false}
              display="default"
              onChange={handleChangeDateTimePicker}
            />
          )}
        </View>
        <Text style={styles.label}>Hora:</Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.textInputCalendar}
            editable={false}
            value={getTimeFormatted(date)}
          />
          <TouchableHighlight
            style={styles.btnCalendar}
            onPress={showTimepicker}
            underlayColor={Colors.Icons.Secondary}>
            <Text style={styles.txtAdd}>01</Text>
            {/*//Colocar el simbolo de un reloj*/}
          </TouchableHighlight>
        </View>
        <View>
          <Text style={styles.label}>Sintomas:</Text>
          <TextInput
            autoCorrect={false}
            keyboardType="default"
            multiline
            numberOfLines={4}
            style={styles.textInput}
            placeholder="Ingresa los sintomas"
            onChangeText={(text) =>
              setFormValue({
                ...formValues,
                symptoms: text,
              })
            }
          />
        </View>
        <View>
          <TouchableHighlight
            style={styles.btnAdd}
            onPress={() => handleAdd()}
            underlayColor={Colors.Icons.Secondary}>
            <Text style={styles.txtAdd}>Agregar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Elements.Background,
    padding: 15,
  },
  label: {
    color: Colors.Elements.CardParagraph,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  textInput: {
    fontSize: 15,
    borderColor: Colors.Icons.Higlight,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 0,
    textAlignVertical: 'top',
  },
  btnAdd: {
    backgroundColor: Colors.Icons.Higlight,
    marginTop: 7,
    paddingVertical: 10,
  },
  txtAdd: {
    color: Colors.Icons.Main,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInputCalendar: {
    fontSize: 15,
    borderColor: Colors.Icons.Higlight,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 0,
    textAlignVertical: 'center',
    flex: 85,
  },
  btnCalendar: {
    backgroundColor: Colors.Icons.Higlight,
    flex: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  titleForm: {
    color: Colors.Elements.CardParagraph,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  calendar: {
    width: 15,
    height: 15,
    //backgroundColor: 'blue',
  },
});
