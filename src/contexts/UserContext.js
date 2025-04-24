import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Usuário',
    followers: 0,
    following: 0,
    wishlistCount: 0,
    wishlist: [], 
    photo:
      'https://i.pinimg.com/736x/f3/85/d7/f385d78eba93e8b768bcc04bf96fe5a5.jpg',
    followingUsers: [],
  });

  const toggleFollow = (userName) => {
    setUser((prev) => {
      const isFollowing = prev.followingUsers.includes(userName);

      return {
        ...prev,
        following: isFollowing ? prev.following - 1 : prev.following + 1,
        followingUsers: isFollowing
          ? prev.followingUsers.filter((name) => name !== userName)
          : [...prev.followingUsers, userName],
      };
    });
  };

  const addToWishlist = (book) => {
    setUser((prev) => {
      const alreadyInWishlist = prev.wishlist.some((b) => b.id === book.id);

      if (!alreadyInWishlist) {
        return {
          ...prev,
          wishlist: [...prev.wishlist, book],
          wishlistCount: prev.wishlistCount + 1,
        };
      }
      return prev;
    });
  };

  const removeFromWishlist = (bookId) => {
    setUser((prev) => ({
      ...prev,
      wishlist: prev.wishlist.filter((book) => book.id !== bookId),
      wishlistCount: prev.wishlistCount > 0 ? prev.wishlistCount - 1 : 0, // Protege contra números negativos
    }));
  };

  const updateUserName = (newName) => {
  setUser(prev => ({
    ...prev,
    name: newName
  }));
};

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        toggleFollow,
        addToWishlist,
        removeFromWishlist,
        updateUserName,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
