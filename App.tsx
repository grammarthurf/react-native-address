import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import axios from "axios";

import {
  Container,
  Title,
  Form,
  FieldText,
  FieldTextInput,
} from "./App.styles";

export default function App() {
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  const loadCep = async (cepParam: string) => {
    try {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${cepParam}/json/`
      );

      setStreet(data.logradouro);
      setComplement(data.complemento);
      setState(data.uf);
      setCity(data.localidade);
      setNeighborhood(data.bairro);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (cep.length === 8) {
      loadCep(cep);
    }
  }, [cep]);

  return (
    <Container>
      <StatusBar backgroundColor="#AAFF1E" />
      <Title>Registro de endereço</Title>

      <Form>
        <View>
          <FieldText>CEP:</FieldText>
          <FieldTextInput value={cep} onChangeText={setCep} maxLength={9} />
        </View>

        <View>
          <FieldText>Rua:</FieldText>
          <FieldTextInput value={street} onChangeText={setStreet} />
        </View>

        <View>
          <FieldText>Número:</FieldText>
          <FieldTextInput value={number} onChangeText={setNumber} />
        </View>

        <View>
          <FieldText>Complemento:</FieldText>
          <FieldTextInput value={complement} onChangeText={setComplement} />
        </View>

        <View>
          <FieldText>Estado:</FieldText>
          <FieldTextInput value={state} onChangeText={setState} />
        </View>

        <View>
          <FieldText>Cidade:</FieldText>
          <FieldTextInput value={city} onChangeText={setCity} />
        </View>

        <View>
          <FieldText>Bairro:</FieldText>
          <FieldTextInput value={neighborhood} onChangeText={setNeighborhood} />
        </View>
      </Form>
    </Container>
  );
}
