import React from 'react';
import {
  Typography, Card, IconButton, Icon, Rating,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Proptypes from 'prop-types';
import COLORS from '../../styles/colors';
import exitIcon from '../../assets/icons/x.svg';
import ratingService from '../../services/Rating';

const RatingCards = ({
  itemRating, personalRating, ratingsCount, itemId, itemIdName, userId, removeRating, getData,
}) => {
  const handleRatingChange = async (value) => {
    if (personalRating) {
      await ratingService.updateRatingAPI(personalRating.id, { starCount: value });
    } else {
      await ratingService.postRatingAPI({ starCount: value, [itemIdName]: itemId, userId });
    }
    await getData();
  };
  return (
    <>
      <Card sx={{ p: '1rem', backgroundColor: COLORS.SUB_ITEM }}>
        <Typography sx={{ display: 'flex' }}>
          Global rating:
          <Rating
            sx={{ ml: '5px', mr: '15px' }}
            value={itemRating}
            precision={0.5}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            readOnly
          />
          {itemRating !== 0 ? Math.round(itemRating * 2) / 2 : <>Rating not given</>}
        </Typography>
        {ratingsCount > 0 && (
          <Typography sx={{ float: 'left', mt: '0.5rem' }}>
            Ratings given:
            {' '}
            {ratingsCount}
          </Typography>
        )}
      </Card>
      <Card sx={{
        p: '1rem',
        mt: '1rem',
        backgroundColor: COLORS.SUB_ITEM,
      }}
      >
        <IconButton
          sx={{
            height: '40px',
            float: 'right',
            ml: '20px',
            '&:hover': { backgroundColor: COLORS.BACKGROUND },
          }}
          title="Remove my rating"
          onClick={removeRating}
        >
          <Icon>
            <img src={exitIcon} height={20} width={20} alt="k" />
          </Icon>
        </IconButton>
        <Typography sx={{ display: 'flex', mt: '0.5rem' }}>
          My rating:
          <Rating
            sx={{ ml: '5px', mr: '15px' }}
            value={personalRating ? personalRating.starCount : 0}
            precision={1}
            onChange={(event, newValue) => {
              handleRatingChange(newValue);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
          />
          {personalRating ? Math.round(personalRating.starCount * 2) / 2 : <>Rating not given</>}
        </Typography>
      </Card>
    </>
  );
};

RatingCards.propTypes = {
  itemRating: Proptypes.number.isRequired,
  personalRating: Proptypes.instanceOf(Object).isRequired,
  ratingsCount: Proptypes.number.isRequired,
  itemId: Proptypes.number.isRequired,
  itemIdName: Proptypes.string.isRequired,
  userId: Proptypes.number.isRequired,
  removeRating: Proptypes.func.isRequired,
  getData: Proptypes.func.isRequired,
};

export default RatingCards;
