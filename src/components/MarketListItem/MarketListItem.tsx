import { Link } from 'react-router-dom';

import { Market } from 'types/Market';

import classes from './MarketListItem.module.scss';

interface MarketListItemProps {
  market: Market;
}

const MarketListItem = ({
  market: { image, id, symbol, current_price, high_24h, low_24h },
}: MarketListItemProps) => {
  return (
    <Link className={classes.component} to={`/coins/${id}`}>
      <img className={classes.image} src={image} alt={`${id}`} />
      <span className={classes.name}>{id}</span>
      <div className={classes.details}>
        <span>Symbol: {symbol}</span>
        <span>High 24 hour Price: {high_24h}</span>
        <span>Current price: {current_price}</span>
        <span>Low 24 hour Price: {low_24h}</span>
      </div>
    </Link>
  );
};

export default MarketListItem;
