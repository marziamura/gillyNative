import * as React from 'react';
import { View } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';

const Dropdown = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState("");
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
 
  React.useEffect(()=>{
      props.callback(value);
  }, [value])
  return (
 
      <View
        style={{
          paddingTop: 50,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button iconRight icon={{ source: "menu-down", direction: 'lrt' }} onPress={openMenu}>{props.title + " " + value}</Button>}>
          {
          props.items.map(({value, title}, index)=>{
           return <Menu.Item onPress={()=>{
               setValue(value);
               closeMenu();
            }} title= {title} />    
          })
          }

        </Menu>
      </View>
 
  );
};

export default Dropdown;