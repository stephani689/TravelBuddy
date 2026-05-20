import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

// ======= Konfigurasi Navigator =======
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const SearchStack = createNativeStackNavigator();

// ======= Data Contoh =======
const destinations = [
  { id: 1, name: 'Bali', description: 'Pulau dewata dengan pantai eksotis', rating: 4.8 },
  { id: 2, name: 'Jakarta', description: 'Ibu kota dengan kehidupan malam seru', rating: 3.9 },
  { id: 3, name: 'Yogyakarta', description: 'Kota budaya dengan sejarah panjang', rating: 4.7 },
];

// ======= Komponen Layar =======

// 1. Layar Utama (Home)
function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.padding}>
        <Text style={styles.headerTitle}>Popular Destinations</Text>
        {destinations.map((dest) => (
          <TouchableOpacity
            key={dest.id}
            onPress={() => navigation.navigate('Detail', { destination: dest })}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>{dest.name}</Text>
            <Text style={styles.cardDesc}>{dest.description}</Text>
            <Text style={styles.cardRating}>⭐ {dest.rating}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

// 2. Layar Detail
function DetailScreen({ route }) {
  const { destination } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.padding}>
        <Text style={styles.detailTitle}>📍 {destination.name}</Text>
        <View style={styles.detailBox}>
          <Text style={styles.detailText}>{destination.description}</Text>
        </View>
        <Text style={styles.detailRating}>Rating: {destination.rating} / 5.0 ⭐</Text>
      </View>
    </View>
  );
}

// 3. Layar Pencarian (Search)
function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('SearchResults', { query: searchQuery });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.padding}>
        <Text style={styles.headerTitle}>🔍 Search</Text>
        <TextInput
          placeholder="Cari destinasi..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 4. Layar Hasil Pencarian
function SearchResultsScreen({ route }) {
  const { query } = route.params;
  return (
    <View style={styles.center}>
      <Text style={styles.infoText}>Menampilkan hasil untuk: </Text>
      <Text style={styles.boldText}>"{query}"</Text>
    </View>
  );
}

// 5. Layar Favorit (Favorites)
function FavoritesScreen() {
  const favorites = [
    { id: 1, name: 'Bali' },
    { id: 3, name: 'Yogyakarta' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.padding}>
        <Text style={styles.headerTitle}>❤️ My Favorites</Text>
        {favorites.length === 0 ? (
          <Text style={styles.emptyText}>Belum ada favorit</Text>
        ) : (
          favorites.map((fav) => (
            <View key={fav.id} style={styles.favCard}>
              <Text style={styles.favText}>❤️ {fav.name}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

// ======= Pengaturan Navigasi =======

function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={headerStyles}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Travel Buddy' }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail Lokasi' }} />
    </Stack.Navigator>
  );
}

function SearchStackNavigator() {
  return (
    <SearchStack.Navigator screenOptions={headerStyles}>
      <SearchStack.Screen name="SearchMain" component={SearchScreen} options={{ title: 'Search' }} />
      <SearchStack.Screen name="SearchResults" component={SearchResultsScreen} options={{ title: 'Results' }} />
    </SearchStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === 'HomeTab' ? 'home' : route.name === 'SearchTab' ? 'search' : 'heart';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00b894',
        tabBarInactiveTintColor: '#999',
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} options={{ title: 'Home' }} />
      <Tab.Screen name="SearchTab" component={SearchStackNavigator} options={{ title: 'Search' }} />
      <Tab.Screen name="FavoritesTab" component={FavoritesScreen} options={{ title: 'Favorites' }} />
    </Tab.Navigator>
  );
}

// ======= Main App =======
export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

// ======= Styling =======
const headerStyles = {
  headerStyle: { backgroundColor: '#00b894' },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: 'bold' },
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  padding: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  card: { backgroundColor: '#f5f5f5', padding: 15, marginBottom: 12, borderRadius: 12, borderLeftWidth: 5, borderLeftColor: '#00b894' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardDesc: { fontSize: 13, color: '#666', marginTop: 4 },
  cardRating: { fontSize: 14, color: '#00b894', marginTop: 6, fontWeight: '700' },
  detailTitle: { fontSize: 28, fontWeight: 'bold', color: '#00b894', marginBottom: 15 },
  detailBox: { backgroundColor: '#f9f9f9', padding: 20, borderRadius: 15, marginBottom: 15 },
  detailText: { fontSize: 16, color: '#444', lineHeight: 24 },
  detailRating: { fontSize: 18, fontWeight: 'bold', color: '#f39c12' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 12, fontSize: 16 },
  button: { backgroundColor: '#00b894', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  infoText: { fontSize: 16, color: '#666' },
  boldText: { fontSize: 18, fontWeight: 'bold', color: '#00b894' },
  favCard: { backgroundColor: '#ffe8e8', padding: 15, marginBottom: 10, borderRadius: 8 },
  favText: { fontSize: 16, fontWeight: 'bold', color: '#d32f2f' },
  emptyText: { color: '#999', fontStyle: 'italic' },
});