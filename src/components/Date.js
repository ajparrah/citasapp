import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {getFullTimeFormattedInText} from '../common/helpers/dateFormatted';
import {Colors} from '../common/UIStylesCommon';

export const DateDog = ({date, deleteDate}) => {
  const handleDelete = (id) => {
    deleteDate(id);
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.labels}>Nombre de Paciente: </Text>
        <Text style={styles.values}>{date.pacient}</Text>
      </View>
      <View>
        <Text style={styles.labels}>Propietario: </Text>
        <Text style={styles.values}>{date.owner}</Text>
      </View>
      <View>
        <Text style={styles.labels}>Fecha y hora: </Text>
        <Text style={styles.values}>
          {getFullTimeFormattedInText(date.date)}
        </Text>
      </View>
      <View>
        <Text style={styles.labels}>Sintomas</Text>
        <Text style={styles.values}>{date.symptoms}</Text>
      </View>
      {/* <Button title="Eliminar" /> //Este elemento posee limitantes y es que se convierte en totalmente nativo segun la plataforma. Por lo que no se le puede aplicar estilos. Es mas restrictivo. Para solucionar ese tipo de cosas existe el touchable*/}
      <View>
        <TouchableHighlight
          style={styles.btnDelete}
          onPress={() => handleDelete(date.id)}
          underlayColor={Colors.Icons.Secondary}>
          <Text style={styles.txtDelete}>Eliminar &times;</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Elements.Background,
    borderBottomWidth: 1,
    borderColor: Colors.Icons.Secondary,
    borderStyle: 'solid',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  labels: {
    color: Colors.Elements.HeadLine,
    fontSize: 18,
    fontWeight: 'bold',
  },
  values: {
    color: Colors.Elements.HeadLine,
    fontSize: 18,
  },
  btnDelete: {
    backgroundColor: Colors.Icons.Higlight,
    marginTop: 7,
    paddingVertical: 10,
  },
  txtDelete: {
    color: Colors.Icons.Main,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
