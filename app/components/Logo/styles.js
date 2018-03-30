import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const imageWidth = Dimensions.get("window").width / 2;

export default EStyleSheet.create({
  $largeContainerSize: imageWidth,
  $largeImageSize: imageWidth / 2,
  $smallContainerSize: imageWidth / 1.5,
  $smallImageSize: imageWidth / 3,
  container: {
    alignItems: "center"
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    width: "$largeContainerSize",
    height: "$largeContainerSize"
  },
  containerImage: {
    width: "$largeContainerSize",
    height: "$largeContainerSize"
  },
  image: {
    position: "absolute",
    width: "$largeImageSize"
  },
  text: {
    fontWeight: "600",
    fontSize: 28,
    letterSpacing: -0.5,
    color: "$white"
  }
});

// ,
//     borderWidth: 0.5,
//     borderColor: "#d6d7da"
//flexGrow: 1,
