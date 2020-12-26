import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {Colors} from './src/common/UIStylesCommon';
import {DateDog} from './src/components/Date';
import {Form} from './src/components/Form/Form';

const App = () => {
  //#region States
  const [showForm, setShowForm] = useState(false);
  const [dates, setDates] = useState([
    {
      id: '1',
      pacient: 'Alejandro',
      owner: 'Sinforos',
      date: new Date(),
      symptoms: 'No siente el brazo',
    },
    {
      id: '2',
      pacient: 'Jose',
      owner: 'Matt',
      date: new Date(),
      symptoms: 'No siente el pie',
    },
    {
      id: '3',
      pacient: 'Pedro',
      owner: 'Lenny',
      date: new Date(),
      symptoms: 'No siente la rodilla ',
    },
  ]);
  //#endregion States

  //#region Handlers
  const deleteDate = (id) => {
    const dateFiltered = dates.filter((date) => date.id !== id);
    setDates(dateFiltered);
  };
  const handleAddDate = (newDate) => {
    setDates([...dates, newDate]);
  };
  //#endregion Handlers

  //#region Effects
  const refDates = useRef(dates); //ESTO ES UNA OPTIMIZACION Y BUENA PRACTICA... Este me permite no pasarle al objeto hijo la opcion de que no se muestre el mismo. Sino que el efecto se encargue de validar el state que seria el general, el de las citas.
  useEffect(() => {
    if (JSON.stringify(refDates.current) !== JSON.stringify(dates)) {
      setShowForm(false);
    }
  }, [dates]);
  //#endregion Effects
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headerApp}>Citas APP</Text>
        <View>
          <TouchableHighlight
            style={styles.btnAddDate}
            onPress={() => setShowForm(!showForm)}
            underlayColor={Colors.Icons.Stroke}>
            <Text style={styles.txtBtnAddDate}>
              {showForm ? 'Cerrar formulario' : 'Agregar nueva cita'}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.content}>
          {showForm ? (
            <Form AddDate={handleAddDate} />
          ) : (
            <>
              <Text style={styles.headerApp}>
                {dates.length > 0 ? 'Administra tus citas' : 'Ingresa una cita'}
              </Text>
              {/* Flatlist va cargando de forma en se va mostrando en la pantalla. No como lo fuera hecho un map. Este esta optimizado para perfomande. Es decir, va a renderizar tantos componente como se puedan ir viendo */}
              <FlatList
                style={styles.list}
                data={dates}
                renderItem={({item}) => (
                  <DateDog date={item} deleteDate={deleteDate} />
                )}
                keyExtractor={(item) => item.id} //Esto es requerido para que ningun item de la lista posea el mismo key. Similar al error que presenta react. Solo que aca se soluciona de esta forma
              />
            </>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Icons.Secondary,
    flex: 1,
  },
  headerApp: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 25,
    color: Colors.Elements.Background,
  },
  content: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  btnAddDate: {
    backgroundColor: Colors.Icons.Higlight,
    marginTop: 7,
    paddingVertical: 10,
  },
  txtBtnAddDate: {
    color: Colors.Icons.Main,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default App;
