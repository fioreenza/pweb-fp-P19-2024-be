import Favorite from '../models/Favorite';

// createFavoriteService function only if user has not already favorited the crowdfund, based on get favorite by user_id and crowdfund_id
export const createFavoriteService = async (user_id: string, crowdfund_id: string) => {
  try {
    // Check if user has already favorited the crowdfund
    const favorite = await Favorite.findOne({ user_id, crowdfund_id });
    if (favorite) {
      return { success: false, message: 'Crowdfund already favorited' };
    }

    // Create a new favorite
    const newFavorite = new Favorite({ user_id, crowdfund_id });
    await newFavorite.save();
    return { success: true, message: 'Crowdfund favorited', data: newFavorite };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to favorite crowdfund' };
  }
};

export const getFavoriteByUserIdService = async (user_id: string) => {
  try {
    // Fetch all favorite crowdfunds for the given user_id
    const favorites = await Favorite.find({ user_id }).populate('crowdfund_id');
    return { success: true, data: favorites };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to fetch favorites' };
  }
};

