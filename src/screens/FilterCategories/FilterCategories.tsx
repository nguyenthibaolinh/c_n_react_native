import React, { useState } from 'react'
import { View, TextInput, Button, FlatList, Text } from 'react-native'

const FilterCategoriesScreen = () => {
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState<string[]>([])

  // Function to handle search
  const handleSearch = () => {
    // Perform search logic here, for now, let's just simulate some results
    const results = ['Result 1', 'Result 2', 'Result 3']
    setSearchResults(results)
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        placeholder="Enter search text"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={searchResults}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

export default FilterCategoriesScreen
