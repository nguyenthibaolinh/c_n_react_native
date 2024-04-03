import IRouteProps from '../library/RouteProps';
import CategoriesScreen from '../screens/Categories';
import PersonalScreen from '../screens/Personal';
import HomeScreen from '../screens/Home';

const routes: IRouteProps[] = [
    {
        name: 'Home',
        component: HomeScreen
    },
    {
        name: 'Categories',
        component: CategoriesScreen
    },
    {
        name: 'Personal',
        component: PersonalScreen
    }
];

export default routes;