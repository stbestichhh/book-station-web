import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import InfoCard from './InfoCard.tsx';
import MotionDivZOpacity from './MotionDivZOpacity.tsx';
import {
  getPagesReadToday,
  getReadingTimeToday,
} from '../utils/dailyReadingTracket.tsx';
import { Book } from '../temp_data.ts';

const ReadingStats = ({ books }: { books: Book[] }) => {
  return (
    <>
      <MotionDivZOpacity>
        <h1
          style={{
            color: 'white',
            marginBottom: '20px',
            fontSize: '80px',
          }}
        >
          Welcome
        </h1>
      </MotionDivZOpacity>
      <div
        style={{
          paddingLeft: '10px',
        }}
      >
        <MotionDivZOpacity delay={0.3}>
          <InfoCard>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h1 style={{ color: 'white' }}>
                Daily reading goal
                <span style={{ color: 'orangered' }}> 15m</span>.
              </h1>
              <div style={{ width: '30%', height: '30%', marginLeft: '10px' }}>
                <CircularProgressbar
                  value={getReadingTimeToday()}
                  maxValue={15}
                  circleRatio={0.75}
                  strokeWidth={12}
                  styles={buildStyles({
                    pathColor: 'orangered',
                    rotation: 1 / 2 + 1 / 8,
                    strokeLinecap: 'round',
                    trailColor: '#ededed',
                  })}
                />
              </div>
            </div>
          </InfoCard>
        </MotionDivZOpacity>
        <MotionDivZOpacity delay={0.2}>
          <InfoCard>
            <h1 style={{ color: 'white' }}>
              Read today{' '}
              <span style={{ color: 'rgb(57, 125, 236)' }}>
                {getPagesReadToday()} pages
              </span>{' '}
              for{' '}
              <span style={{ color: 'orangered' }}>
                {' '}
                {getReadingTimeToday()}m
              </span>
              .
            </h1>
          </InfoCard>
        </MotionDivZOpacity>
        <MotionDivZOpacity delay={0.6}>
          <InfoCard>
            <h1 style={{ color: 'white' }}>
              You finished{' '}
              <span style={{ color: 'rgb(105, 206, 103)' }}>
                {books.filter((book) => book.status === 'Completed').length}{' '}
                books
              </span>
              .
            </h1>
          </InfoCard>
        </MotionDivZOpacity>
        <MotionDivZOpacity delay={0.1}>
          <InfoCard>
            <h1 style={{ color: 'white' }}>
              You read{' '}
              <span style={{ color: 'rgb(57, 125, 236)' }}>
                {books.reduce((acc, book) => acc + book.pagesRead, 0)} pages
              </span>
              .
            </h1>
          </InfoCard>
        </MotionDivZOpacity>
        <MotionDivZOpacity delay={0.4}>
          <InfoCard>
            <h1 style={{ color: 'white' }}>
              You read for{' '}
              <span style={{ color: 'rgb(95, 92, 222)' }}>
                {books.reduce((acc, book) => acc + book.minutesSpent, 0)}m
              </span>
              .
            </h1>
          </InfoCard>
        </MotionDivZOpacity>
        <MotionDivZOpacity delay={0.8}>
          <InfoCard>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h1 style={{ color: 'white' }}>
                Finished this year
                <span style={{ color: 'rgb(105, 206, 103)' }}>
                  {' '}
                  {
                    books.filter(
                      (book) => book.year_finished === new Date().getFullYear()
                    ).length
                  }{' '}
                  books
                </span>
                .
              </h1>
            </div>
          </InfoCard>
        </MotionDivZOpacity>
        <MotionDivZOpacity delay={0.2}>
          <InfoCard>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h1 style={{ color: 'white' }}>
                Yearly reading goal
                <span style={{ color: 'orange' }}> 5 books</span>.
              </h1>
              <div style={{ width: '25%', height: '25%', marginLeft: '20px' }}>
                <CircularProgressbar
                  value={
                    books.filter(
                      (book) => book.year_finished === new Date().getFullYear()
                    ).length
                  }
                  maxValue={5}
                  circleRatio={0.75}
                  strokeWidth={12}
                  styles={buildStyles({
                    pathColor: 'orange',
                    rotation: 1 / 2 + 1 / 8,
                    strokeLinecap: 'round',
                    trailColor: '#ededed',
                  })}
                />
              </div>
            </div>
          </InfoCard>
        </MotionDivZOpacity>
      </div>
    </>
  );
};
export default ReadingStats;
