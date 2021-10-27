import { useState } from 'react';

import MarketListItem from 'components/MarketListItem';
import Button from 'components/Button';
import Loading from 'components/Loading';
import ErrorCard from 'components/ErrorCard';
import { useMarkets } from 'hooks/useMarkets';

import classes from './MarketList.module.scss';

const MarketList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useMarkets(page);
  const isFirstPage = page === 1;
  const markets = data ?? [];

  if (isLoading) return <Loading className={classes.loading} />;

  if (isError)
    return (
      <ErrorCard
        title="Sorry! We ran into a problem during data fetching 😥"
        description={`Details: ${error?.message ?? 'Unknown error'}`}
      />
    );

  return (
    <>
      <h2 className={classes.title}>Markets</h2>
      <section className={classes.listItems}>
        {markets.map((market) => (
          <MarketListItem key={market.id} market={market} />
        ))}
      </section>
      <div className={classes.buttonContainer}>
        <Button onClick={() => setPage((prevPage) => prevPage + 1)}>
          Next
        </Button>
        {!isFirstPage && (
          <Button onClick={() => setPage((prevPage) => prevPage - 1)}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default MarketList;
