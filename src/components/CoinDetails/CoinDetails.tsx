import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';

import Skeleton from 'components/Skeleton';
import ErrorCard from 'components/ErrorCard';
import { useCoin } from 'hooks/useCoin';
import * as RoutePaths from 'constants/RoutePaths';

import classes from './CoinDetails.module.scss';

type UrlParams = { id: string };

const CoinDetails = () => {
  const { id } = useParams<UrlParams>();
  const { data, isLoading, isError, error } = useCoin(id);

  if (isError)
    return (
      <ErrorCard
        title="Sorry! We ran into a problem during data fetching 😥"
        description={`Details: ${error?.message ?? 'Unknown error'}`}
      />
    );

  return (
    <div className={classes.component}>
      <Link className={classes.back} to={RoutePaths.MARKETS}>
        Back
      </Link>
      <Skeleton height="2rem" isLoading={isLoading}>
        <span className={`${classes.name} ${classes.fontMedium}`}>
          {data?.id}
        </span>
      </Skeleton>
      <div className={classes.infoRow}>
        <span>Hashing algorithm:</span>
        <Skeleton isLoading={isLoading}>
          <span className={classes.fontMedium}>{data?.hashing_algorithm}</span>
        </Skeleton>
      </div>
      <div className={classes.infoRow}>
        <span>Current price (EUR):</span>
        <Skeleton isLoading={isLoading}>
          <span className={classes.fontMedium}>
            {data?.market_data.current_price.eur}
          </span>
        </Skeleton>
      </div>
      <div className={classes.infoRow}>
        <span>Symbol:</span>
        <Skeleton isLoading={isLoading}>
          <span className={classes.fontMedium}>{data?.symbol}</span>
        </Skeleton>
      </div>
      <div className={classes.infoRow}>
        <span>Home page links:</span>
        <Skeleton isLoading={isLoading}>
          <Link
            key={data?.links.homepage[0]}
            to={data?.links.homepage[0] ?? '#'}
            target="_blank"
          >
            <span className={classes.fontMedium}>
              {data?.links.homepage[0]}
            </span>
          </Link>
        </Skeleton>
      </div>
      <div className={classes.descriptionContainer}>
        <span>Description:</span>
        <Skeleton isLoading={isLoading} height="30vh" width="100%">
          <span
            className={classes.fontMedium}
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(
                data && data.description.en
                  ? data?.description.en
                  : 'Description not available',
                {
                  allowedTags: ['a'],
                }
              ),
            }}
          />
        </Skeleton>
      </div>
    </div>
  );
};

export default CoinDetails;
