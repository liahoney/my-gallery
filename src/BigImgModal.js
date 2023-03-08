import { Image, Modal, Pressable, TouchableOpacity, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const ArrowButton = ({ iconName, onPress, disabled }) => {
  {
    /* < , > 버튼 */
  }
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={{
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
      height: "100%",
      backgroundColor: "lightblue",
    }}
  >
    <SimpleLineIcons
      name={iconName}
      size={20}
      color={disabled ? "transparent" : "black"}
    />
  </TouchableOpacity>;
};

export default ({
  modalVisible,
  onPressBackdrop,
  selectedImage,
  onPressLeftArrow,
  onPressRightArrow,
  showPreviousArrow,
  showNextArrow,
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
          {showPreviousArrow && (
            <SimpleLineIcons
              name="arrow-left"
              onPress={onPressLeftArrow}
              style={{
                // justifyContent: "center",
                // alignItems: "center",
                paddingHorizontal: 20,
                height: "100%",
                backgroundColor: "lightblue",
              }}
            ></SimpleLineIcons>
          )}
          {/* < 버튼  */}

          {/* <ArrowButton 
          iconName="arrow-left"
          onPress={onPressLeftArrow}
          disabled={!showPreviousArrow}
          /> */}

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
          {showNextArrow && (
            <SimpleLineIcons
              name="arrow-right"
              onPress={onPressRightArrow}
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
                height: "100%",
                backgroundColor: "lightblue",
              }}
              disabled={!showNextArrow}
            ></SimpleLineIcons>
          )}

          {/* <ArrowButton
          iconName="arrow-right" 
          onPress={onPressRightArrow}
          disabled={!showNextArrow}
          /> */}
        </View>
      </Pressable>
    </Modal>
  );
};
