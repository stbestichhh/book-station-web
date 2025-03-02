import { books } from '../temp_data.ts';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import InfoCard from './InfoCard.tsx';

const ReadingStats = () => {
  return (
    <>
      <h1
        style={{
          color: 'white',
          marginBottom: '20px',
          fontSize: '80px',
        }}
      >
        Welcome
      </h1>
      <div
        style={{
          paddingLeft: '10px',
        }}
      >
        <InfoCard>
          <h1 style={{ color: 'white' }}>
            You read{' '}
            <span style={{ color: 'rgb(57, 125, 236)' }}>
              {books.reduce((acc, book) => acc + book.pagesRead, 0)} pages
            </span>
            .
          </h1>
        </InfoCard>
        <InfoCard>
          <h1 style={{ color: 'white' }}>
            You read for{' '}
            <span style={{ color: 'rgb(95, 92, 222)' }}>
              {books.reduce((acc, book) => acc + book.minutesSpent, 0)}m
            </span>
            .
          </h1>
        </InfoCard>
        <InfoCard>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{ color: 'white' }}>
              Yearly reading goal
              <span style={{ color: 'orange' }}> 5 books</span>.
            </h1>
          </div>
        </InfoCard>
        <InfoCard>
          <h1 style={{ color: 'white' }}>
            You finished{' '}
            <span style={{ color: 'rgb(105, 206, 103)' }}>
              {books.filter((book) => book.status === 'Completed').length} books
            </span>
            .
          </h1>
        </InfoCard>
        <InfoCard>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{ color: 'white' }}>
              Daily reading goal
              <span style={{ color: 'yellow' }}> 15m</span>.
            </h1>
            <div style={{ width: '30%', height: '30%', marginLeft: '10px' }}>
              <CircularProgressbar
                value={3}
                maxValue={15}
                circleRatio={0.75}
                strokeWidth={12}
                styles={buildStyles({
                  pathColor: 'yellow',
                  rotation: 1 / 2 + 1 / 8,
                  strokeLinecap: 'round',
                  trailColor: 'darkgrey',
                })}
              />
            </div>
          </div>
        </InfoCard>
      </div>
    </>
  );
};
export default ReadingStats;
