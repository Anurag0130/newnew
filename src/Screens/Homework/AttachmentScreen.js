import { View, FlatList, Image, StyleSheet, Dimensions, Text } from 'react-native';
import React from 'react';

// Calculate the width of each image
const { width } = Dimensions.get('window');
const imageWidth = width / 2; // Two images per row

const AttachmentScreen = ({ route }) => {
  const { attachmentArray } = route.params;

  // Function to render each item
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.cloud_front_serving_url }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {attachmentArray.length === 0 ? (
        <Text style={styles.noAttachmentText}>No attachments available</Text>
      ) : (
        <FlatList
          data={attachmentArray}
          renderItem={renderItem}
          keyExtractor={(item) => item.filename}
          numColumns={2}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 5,
    marginTop:20
  },
  image: {
    width: imageWidth - 10, // Adjust width to account for margins
    height: 150, // Set a fixed height for the images
    borderRadius: 8,
  },
});

export default AttachmentScreen;
