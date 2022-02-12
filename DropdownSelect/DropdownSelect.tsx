import React, { memo, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Text as NativeText, Menu, Pressable, useTheme } from "native-base";
import { DropdownItem } from "ui/DropdownSelect/DropdownItem";

type DropdownSelectProps = {
  children: React.ReactNode;
  items: Item[];
  value: any;
  textColor: string;
  backgroundColor: string;
  changeHandler: (value: any) => void;
};

export const DropdownSelect = memo<DropdownSelectProps>(
  ({ items, value, changeHandler, children, textColor, backgroundColor }) => {
    const options = useMemo(
      () =>
        items.map((item: Item) => (
          <DropdownItem
            icon={item.icon}
            key={`dropdownItem${item.title}`}
            onPress={() => changeHandler(item.value)}
            isActive={value === item.value}
          >
            <NativeText style={{ color: textColor }}>{item.title}</NativeText>
          </DropdownItem>
        )),
      [items, value, changeHandler]
    );

    return (
      <Menu
        style={{ ...styles.mainBox, backgroundColor: backgroundColor }}
        closeOnSelect={false}
        w={201}
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              {children}
            </Pressable>
          );
        }}
      >
        {options}
      </Menu>
    );
  }
);

const styles = StyleSheet.create({
  mainBox: {
    borderRadius: 16,
  },
});

type Item = {
  value: any;
  title: any;
  icon: React.ReactNode;
};
