import Splash from '../../screens/Splash';
import SplashII from '../../screens/SplashII';
import Home from '../../screens/Home';
import Detials from '../../screens/ShowCategory';
import Setting from '../../screens/Setting';
enum enum_stack {
  SPLASH_SCREEN = 'SPlash_Screen',
  SPLASH_SCREENII = 'SPlash_ScreenII',
  HOME_SCREEN = 'Home_Screen',
  DETAIL_SCREEN = 'Detail_Screen',
  SETTING_SCREEN = 'Setting_Screen',
}

const getComponentByName = (screeName: string) => {
  switch (screeName) {
    case enum_stack.SPLASH_SCREEN:
      return Splash;
    case enum_stack.SPLASH_SCREENII:
      return SplashII;
    case enum_stack.HOME_SCREEN:
      return Home;
    case enum_stack.DETAIL_SCREEN:
      return Detials;
    case enum_stack.SETTING_SCREEN:
      return Setting;
    default:
      return Splash;
  }
};
const _routes = {
  navigation_routes: Object.keys(enum_stack).map(item => {
    let name = item as keyof typeof enum_stack;
    return {
      name: enum_stack[name],
      component: getComponentByName(enum_stack[name]),
    };
  }),
};

export default _routes;
