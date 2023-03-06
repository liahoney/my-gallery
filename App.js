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
import BigImgModal from "./src/BigImgModal";
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
    textInputModalVisible,
    openTextInputModal,
    closeTextInputModal, 
        albumTitle,
        setAlbumTitle,
        addAlbum,
        resetAlbumTitle,
        isDropdownOpen,
        openDropDown,
        closeDropDown,
        albums,
        selectAlbum,
        deleteAlbum,
        bigImgModalVisible,
        openBigImgModal,
        closeBigImgModal,
        selectImage,
        selectedImage,
        moveToPreviousImage,
        moveToNextImage,
        

  } = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  };

  const onLongPressImage = (imageId) => deleteImage(imageId);

  const onPressTextInputModalBackdrop = () => {
    closeTextInputModal();
  }
  const onLongPressAlbum = (albumId) => deleteAlbum(albumId)

  const onPressImage = (image) => {
    //TODO: image
    selectImage(image)
    openBigImgModal();
    

  }

  const onPressBigImgModalBackdrop = () => {
    closeBigImgModal();
  }

  const renderItem = ({ item: image, index }) => {
    const { id, uri } = image
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
      <TouchableOpacity onPress={() => onPressImage(image)} onLongPress={() => onLongPressImage(id)}>
        <Image
          source={{ uri }}
          style={{ width: columnSize, height: columnSize }}
        />
      </TouchableOpacity>
    );
  };

  const onPressAddAlbum = () => {
    openTextInputModal()
    
  }

  const onSubmitEditing = () => {
    if(!albumTitle) return;
    //1.앨범에 타이틀 추가
    addAlbum()
    console.log('albumTitle', albumTitle)
    //2.모달 닫기 &TextInput의 value초기화
    closeTextInputModal();
    resetAlbumTitle(); 
  
    
}
  const onPressBackdrop = () => {
    closeTextInputModal()
  }

const onPressHeader = () => {
  if(isDropdownOpen) {
    closeDropDown()
  } else {
    openDropDown()
  }
  
}

const onPressAlbum = (album) => {
  selectAlbum(album)
  closeDropDown()
}

const onPressLeftArrow = () => {
  moveToPreviousImage()
}
const onPressRightArrow = () => {
  moveToNextImage()
}


  return (
    <SafeAreaView style={styles.container}>
    
      {/* <Button title="갤러리 열기" onPress={onPressOpenGallery} /> */}

      {/* 앨범 DropDown, 앨범 추가 버튼  */}
      <MyDropDownPicker 
        selectedAlbum={selectedAlbum} 
        onPressAddAlbum={onPressAddAlbum} 
        onPressHeader={onPressHeader}
        isDropdownOpen={isDropdownOpen}
        albums={albums}
        onPressAlbum={onPressAlbum}
        onLongPressAlbum={onLongPressAlbum}
        />
      {/* 이미지를 크게 보는 모달 */}

     
      
      {/* 앨범을 추가하는 TextInputModal */}
      <TextInputModal 
        modalVisible={textInputModalVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={onPressTextInputModalBackdrop}
        onPressHeader={onPressHeader}
      />

       <BigImgModal
      modalVisible={bigImgModalVisible}
      onPressBackdrop={onPressBigImgModalBackdrop}
      selectedImage={selectedImage}
      onPressLeftArrow={onPressLeftArrow}
      onPressRightArrow={onPressRightArrow}
      />

      <FlatList
        data={imagesWithAddButton}
        renderItem={renderItem}
        //  horizontal
        numColumns={3}
        style={{ zIndex: -2}}
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
