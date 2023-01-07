import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native';

export default SearchInput = ({ data, searchProperties, setResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  function handleChange(text) {
    setSearchTerm(text);
  }

  useEffect(() => {
    search(searchTerm);
  }, [searchTerm]);

  function search(text) {
    if (text.length === 0) {
      setResults(data);
      return;
    }

    let filteredResults = data.filter(item => {
      return searchProperties.some(property => {
        return item[property].toString().toLowerCase().includes(text.toLowerCase());
      });
    });

    if (text.length < 2)
      filteredResults = filteredResults.slice(0, 5);

    setResults(filteredResults);
  }

  return (
    <View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginVertical: 20,
          padding: 10,
          borderRadius: 10,
          margin: 20
        }}
        onChangeText={handleChange}
        value={searchTerm}
        placeholder="Search"
      />
    </View>
  );
}