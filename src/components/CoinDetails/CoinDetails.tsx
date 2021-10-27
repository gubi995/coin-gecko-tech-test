import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';

import { useCoin } from 'hooks/useCoin';
import { Coin } from 'types/Coin';
import * as RoutePaths from 'constants/RoutePaths';

import classes from './CoinDetails.module.scss';

type UrlParams = { id: string };

const CoinDetails = () => {
  const { id } = useParams<UrlParams>();
  const { data, isLoading, isError, error } = useCoin(id);
  const {
    id: name,
    hashing_algorithm,
    market_data,
    symbol,
    links,
    description,
  } = data ?? ({} as Coin);

  if (isLoading) return <span>Loading...</span>;

  if (isError) return <span>{error?.message ?? 'Unknown error'}</span>;

  const [homepage] = links.homepage;

  return (
    <div className={classes.component}>
      <Link className={classes.back} to={RoutePaths.MARKETS}>
        Back
      </Link>
      <div className={classes.card}>
        <span className={`${classes.name} ${classes.fontMedium}`}>{name}</span>
        <span>
          Hashing algorithm:{' '}
          <span className={classes.fontMedium}>{hashing_algorithm}</span>
        </span>
        <span>
          Current price (EUR):{' '}
          <span className={classes.fontMedium}>
            {market_data.current_price.eur}
          </span>
        </span>
        <span>
          Symbol: <span className={classes.fontMedium}>{symbol}</span>
        </span>
        <span>
          Home page links:{' '}
          <Link key={homepage} to={homepage} target="_blank">
            <span className={classes.fontMedium}>{homepage}</span>
          </Link>
        </span>
        {description.en && (
          <>
            <span>Description:</span>
            <span
              className={classes.fontMedium}
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(description.en, { allowedTags: ['a'] }),
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CoinDetails;
