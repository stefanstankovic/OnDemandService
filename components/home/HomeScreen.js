import React, {Component} from 'react';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack hideNavBar initial={this.props.loggedIn}>
        <Scene
          hideNavBar
          key="home-screen"
          tabs={true}
          tabBarStyle={styles.tabBar}
          default="Main">
          <Scene
            key="home"
            tabBarLabel="Home"
            gesturesEnabled={false}
            hideNavBar
            component={HomePage}
            icon={({focused}) => {
              return (
                <Icon
                  style={{width: 30}}
                  type="antdesign"
                  name={'home'}
                  size={30}
                  color={focused ? activeIconColor : iconColor}
                />
              );
            }}
          />
          <Scene
            hideNavBar
            key="map"
            tabBarLabel="Map"
            component={MapPage}
            icon={({focused}) => {
              return (
                <Icon
                  style={{width: 30}}
                  type="entypo"
                  name={'map'}
                  size={30}
                  color={focused ? activeIconColor : iconColor}
                />
              );
            }}
          />
          <Scene
            hideNavBar
            key="notifications"
            tabBarLabel="Notifications"
            component={NotificationsPage}
            icon={({focused}) => {
              return (
                <Icon
                  style={{width: 30}}
                  type="antdesign"
                  name={'notification'}
                  size={30}
                  color={focused ? activeIconColor : iconColor}
                />
              );
            }}
          />
        </Scene>
      </Stack>
    );
  }
}
