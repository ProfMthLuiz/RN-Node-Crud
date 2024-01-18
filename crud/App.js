import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:3000/api/users", { name, email });
      setName("");
      setEmail("");
      fetchData();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      fetchData();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  return (
    <View>
      <Text>Usuários:</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
            <Button title="Excluir" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
      <Text>Novo Usuário:</Text>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Criar" onPress={handleCreate} />
    </View>
  );
};

export default App;
