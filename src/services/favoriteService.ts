import Favorite from '../models/Favorite';

export const addFavoriteCrowdfundService = async (user_id: string, crowdfund_id: string) => {
  try {
    const newFavorite = new Favorite({ user_id, crowdfund_id });
    await newFavorite.save();
    return { success: true, message: 'Crowdfund added to favorites', data: newFavorite };
  } catch (error) {
    throw new Error('Failed to add crowdfund to favorites');
  }
};

export const getFavoriteByUserIdService = async (user_id: string) => {
  try {
    const favorites = await Favorite.find({ user_id });
    return { success: true, data: favorites };
  } catch (error) {
    throw new Error('Failed to fetch favorites');
  }
};

export const getAllFavoritesService = async () => {
    try {
        const favorites = await Favorite.find();
        return { success: true, data: favorites };
    } catch (error) {
        throw new Error('Failed to fetch favorites');
    }
    };
