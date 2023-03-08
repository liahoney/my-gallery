import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const defaultAlbum = {
    id: 1,
    title: "기본",
}

const ASYNC_KEY = {
    IMAGES: "images",
    ALBUMS: "albums"

}

export const useGallery = () => {

    const [images, setImages] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum)
    const [albums, setAlbums] = useState([defaultAlbum])
    const [textInputModalVisible, setTextInputModalVisible] = useState(false)
    const [bigImgModalVisible, setBigImgModalVisible] = useState(false)
    const [albumTitle, setAlbumTitle] = useState('')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)

    const _setImages = (newImages) => {
        setImages(newImages)
        AsyncStorage.setItem(ASYNC_KEY.IMAGES, JSON.stringify(newImages))
    }
    const _setAlbums = (newAlbums) => {
        setImages(newAlbums)
        AsyncStorage.setItem(ASYNC_KEY.ALBUMS, JSON.stringify(newAlbums))
    }

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        const lastId = images.length === 0 ? 0 : images[images.length -1].id
        const newImage = {
            id: lastId+1, 
            uri: result.assets[0].uri,
            albumId: selectedAlbum.id 
        }
        _setImages([ ...images, newImage ]);
      }
    };
    const deleteImage = (imageId) => {
        Alert.alert("이미지를 삭제하시겠어요?", "", [
            {
                style: "cancel",
                text: "아니오"
            },
            {
                text: "네",
                onPress: () => {
                    const newImages = images.filter(image => image.id !== imageId)
                    _setImages(newImages);
                }
            }
        ])
    }
    
    const openTextInputModal = () => setTextInputModalVisible(true);
    const closeTextInputModal = () => setTextInputModalVisible(false);
    const openBigImgModal = () => setBigImgModalVisible(true);
    const closeBigImgModal = () => setBigImgModalVisible(false);
    const openDropDown = () => setIsDropdownOpen(true);
    const closeDropDown = () => setIsDropdownOpen(false);

    const addAlbum = () => {
        const lastId = albums.length === 0 ? 0 : albums[albums.length -1].id
        const newAlbum = {
            id: lastId + 1,
            title: albumTitle,
        }
        
        _setAlbums([
            ...albums,
            newAlbum,

        ])
        console.log('albums?',albums)
        console.log('newAlbum?', newAlbum)
        setSelectedAlbum(newAlbum)
    }

    const selectAlbum = (album) => {
        setSelectedAlbum(album)  
    }
    
    const deleteAlbum = (albumId) => {
        if(albumId === defaultAlbum.id) {
            Alert.alert('기본 앨범은 삭제 할수없어요!')
            return;
        }
        Alert.alert("앨범을 삭제하시겠어요?", "", [
            {
                style: "cancel",
                text: "아니오"
            },
            {
                text: "네",
                onPress: () => {
                    const newAlbums = albums.filter(album => album.id !== albumId)
                    _setAlbums(newAlbums);
                    setSelectedAlbum(defaultAlbum)
                }
            }
        ])
    }
    const selectImage = (image) => {
        setSelectedImage(image)
    } 
    const filteredImages = images.filter((image)=> image.albumId === selectedAlbum.id )
    
    const moveToPreviousImage = () => {
    
        const selectedImageIndex = filteredImages.findIndex(image => image.id === selectedImage.id)
        const previousImageIdx = selectedImageIndex -1
        if(previousImageIdx < 0) return;
        console.log('selectedImageIndex', selectedImageIndex)
        const previousImage = filteredImages[previousImageIdx]
        setSelectedImage(previousImage)
        console.log('previousImageIdx', previousImageIdx)
        
        
    }
    const moveToNextImage = () => {
        
            const selectedImageIndex = filteredImages.findIndex(image => image.id == selectedImage.id)
        const nextImageIdx = selectedImageIndex + 1
        if((nextImageIdx > filteredImages.length -1) || nextImageIdx === -1) return;
        console.log('selectedImageIndex in rightarrow', selectedImageIndex)
        const nextImage = filteredImages[nextImageIdx]
        setSelectedImage(nextImage)
        console.log('nextImageIdx', nextImageIdx)  
        
          
    }

    const showPreviousArrow = filteredImages.findIndex(image => image.id === selectedImage?.id) !== 0;
    const showNextArrow = filteredImages.findIndex(image => image.id === selectedImage?.id) !== filteredImages.length -1;

    // showPreviousArrow = true;
    // showNextArrow = true;

    const resetAlbumTitle = () => setAlbumTitle('')

    
    
    const imagesWithAddButton = [
        ...filteredImages,
        {
          id: -1,
          uri: "",
        }
      ]

      const initValues = async () => {
        //images
        const imagesFromStorage = await AsyncStorage.getItem(ASYNC_KEY.IMAGES)
        if(imagesFromStorage !== null) {
            const parsed = JSON.parse(imagesFromStorage)
            setImages(parsed)
            console.log('imagesFromStorage', imagesFromStorage)
        }

        //album
        const albumsFromStorage = await AsyncStorage.getItem(ASYNC_KEY.ALBUMS)
        if(albumsFromStorage !== null) {
            const parsed = JSON.parse(imagesFromStorage)
            setAlbums(parsed)
            console.log('albumsFromStorage', albumsFromStorage)
        }
      }

      useEffect(() => {
        initValues();
      },[])

    return {
        images,
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
        showPreviousArrow,
        showNextArrow
    }
  
}