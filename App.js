import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MyDropDownPicker from "./src/MyDropDownPicker";
import TextInputModal from "./src/TextInputModal";

import { useGallery } from "./src/use-gallery";

const width = Dimensions.get("screen").width;
const columnSize = width / 3;

export default function App() {
  const { 
    // images, 
    pickImage, 
    deleteImage, 
    imagesWithAddButton, 
    selectedAlbum,
    modalVisible,
        openModal,
        closeModal, 
        albumTitle,
        setAlbumTitle,
        addAlbum,
        resetAlbumTitle 
  } = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  };

  const onLongPressImage = (imageId) => deleteImage(imageId);

  const renderItem = ({ item: { id, uri }, index }) => {
    if (id === -1) {
      return (
        <TouchableOpacity
          onPress={onPressOpenGallery}
          style={{
            width: columnSize,
            height: columnSize,
            backgroundColor: "lightgrey",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "100", fontSize: 45 }}>+</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity onLongPress={() => onLongPressImage(id)}>
        <Image
          source={{ uri }}
          style={{ width: columnSize, height: columnSize }}
        />
      </TouchableOpacity>
    );
  };

  const onPressAddAlbum = () => {
    openModal()
  }

  const onSubmitEditing = () => {
    //1.앨범에 타이틀 추가
    addAlbum()
    //2.모달 닫기 &TextInput의 value초기화
    closeModal();
    resetAlbumTitle(); 
    
}

  return (
    <SafeAreaView style={styles.container}>
    
      {/* <Button title="갤러리 열기" onPress={onPressOpenGallery} /> */}

      {/* 앨범 DropDown, 앨범 추가 버튼  */}
      <MyDropDownPicker selectedAlbumTitle={selectedAlbum.title} onPressAddAlbum={onPressAddAlbum}/>

      {/* 앨범을 추가하는 TextInputModal */}
      <TextInputModal 
        modalVisible={modalVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={onPressBackdrop}
      />
      <FlatList
        data={imagesWithAddButton}
        renderItem={renderItem}
        //  horizontal
        numColumns={3}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
});
