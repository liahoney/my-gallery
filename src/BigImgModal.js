import { Image, Modal, Pressable, TouchableOpacity, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const ArrowButton = ({iconName, onPress}) => {

    {/* < , > 버튼 */}
  <TouchableOpacity
    onPress={onPress}
    style={{
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
      height: "100%",
      backgroundColor: "lightblue",
    }}
  >
    <SimpleLineIcons name={iconName} size={20} color="black" />
  </TouchableOpacity>;
};

export default ({ 
    modalVisible, 
    onPressBackdrop, 
    selectedImage,
    onPressLeftArrow,
    onPressRightArrow,
     }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <Pressable
        onPress={onPressBackdrop}
        style={{
          flex: 1,
          //   backgroundColor: "lightblue",
          backgroundColor: `rgba(115,115,115, 0.5)`,
          justifyContent: "center",
          alignItems: "center",
          //   opacity: 0.5,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* < 버튼  */}
          <ArrowButton iconName='arrow-left' onPress={onPressLeftArrow}/>

          {/* 이미지 */}
          <Pressable>
            <Image
              source={{ uri: selectedImage?.uri }}
              style={{
                width: 280,
                height: 280,
                backgroundColor: "white",
                resizeMode: "contain",
              }}
            />
          </Pressable>

          {/* > 버튼  */}
          <ArrowButton iconName='arrow-right' onPress={onPressRightArrow}/>
        </View>
      </Pressable>
    </Modal>
  );
};
