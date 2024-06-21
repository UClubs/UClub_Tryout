import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handelPress,
  containerStyle,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handelPress}
      activeOpacity={0.7}
      disabled={isLoading}
      className={`bg-secondary-100 rounded-xl min-h-[62px] justify-center items-center ${containerStyle}`}
    >
      <Text className="text-primary font-psemibold text-lg p-2">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
