import React from 'react';
import QuestionCard from './QuestionCard';
import {
  PAGE_NOT_FOUND,
  PAGE_NOT_FOUND_HEADING,
  RANDOM_IMAGE,
  CardViewMode,
  getRandomImageUrlByTimeStamp
} from '../utils/helpers';

const PageNotFound = () => (
  <div>
    <h1 className='title'>{PAGE_NOT_FOUND_HEADING}</h1>

    <div className='masonry bordered'>
      <QuestionCard
        cardViewMode={CardViewMode.PLACEHOLDER}
        imageAltText={RANDOM_IMAGE}
        imageUrl={getRandomImageUrlByTimeStamp()}
      />
      <QuestionCard
        cardViewMode={CardViewMode.PAGE_NOT_FOUND}
        imageAltText={PAGE_NOT_FOUND}
        imageUrl={getRandomImageUrlByTimeStamp()}
      />
      <QuestionCard
        cardViewMode={CardViewMode.PLACEHOLDER}
        imageAltText={RANDOM_IMAGE}
        imageUrl={getRandomImageUrlByTimeStamp()}
      />
    </div>
  </div>
);

export default PageNotFound;
