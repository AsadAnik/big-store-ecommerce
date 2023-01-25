import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Rating } from '@mui/material';
import { withStyles } from '@mui/styles';
import { Star as StarIcon } from '@mui/icons-material';

// Review Stars From React Rating Stars Component..
export default function ReviewStars({ ratings, numOfReviews = 0, size }) {
    const options = {
        edit: false,
        color: 'lightgray',
        activeColor: 'tomato',
        value: ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? size : size + 5,
    };

    return (
        <>
            <ReactStars {...options} /> {numOfReviews !== null && <span className={'details-block-2-span'}>({numOfReviews} Reviews)</span>}
        </>
    );
}


// Review Stars From MUI (Material UI)..
// Also MUI stars Improves lot's of Error and Bugs..
export function ReviewStarsMUI({ ratings, numOfReviews, size = "" }) {
    const options = {
        size: size,
        value: ratings,
        readOnly: true,
        precision: 0.5,
    };

    // Custom Icon To Change Color..
    const CustomStar = withStyles({
        root: {
          color: 'tomato',
        },
      })((props) => <StarIcon {...props} />);

    return (
        <>
            <Rating icon={<CustomStar />} {...options} /> {numOfReviews && <span className={'details-block-2-span'}>({numOfReviews} Reviews)</span>}
        </>
    );
}