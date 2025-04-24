import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Feed from '../screens/Feed';
import Search from '../screens/Search';
import Wishlist from '../screens/Wishlist';
import Profile from '../screens/Profile';
import BookDetails from '../screens/BookDetails';

const Tab = createBottomTabNavigator();
const SearchStack = createStackNavigator();
const WishlistStack = createStackNavigator();

const SearchStackScreen = ({ addToWishlist, wishlist }) => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="SearchMain">
        {(props) => (
          <Search
            {...props}
            addToWishlist={addToWishlist}
            wishlist={wishlist}
          />
        )}
      </SearchStack.Screen>
      <SearchStack.Screen
        name="BookDetails"
        component={BookDetails}
        options={{
          title: 'Detalhes do Livro',
          headerStyle: { backgroundColor: '#fff' },
          headerTitleStyle: { color: '#000' },
        }}
      />
    </SearchStack.Navigator>
  );
};

const WishlistStackScreen = ({ wishlist, removeFromWishlist }) => {
  return (
    <WishlistStack.Navigator>
      <WishlistStack.Screen name="WishlistMain">
        {(props) => (
          <Wishlist
            {...props}
            wishlist={wishlist}
            removeFromWishlist={removeFromWishlist}
          />
        )}
      </WishlistStack.Screen>
      <WishlistStack.Screen
        name="BookDetails"
        component={BookDetails}
        options={{
          title: 'Detalhes do Livro',
          headerStyle: { backgroundColor: '#fff' },
          headerTitleStyle: { color: '#000' },
        }}
      />
    </WishlistStack.Navigator>
  );
};

export default function TabNavigator({
  wishlist,
  addToWishlist,
  removeFromWishlist,
}) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Pesquisa">
        {(props) => (
          <SearchStackScreen
            {...props}
            addToWishlist={addToWishlist}
            wishlist={wishlist}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Lista">
        {(props) => (
          <WishlistStackScreen
            {...props}
            wishlist={wishlist}
            removeFromWishlist={removeFromWishlist}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}
