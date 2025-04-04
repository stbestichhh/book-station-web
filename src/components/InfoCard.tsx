import { ReactNode } from 'react';

const InfoCard = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={`card d-inline-block`}
      style={{
        flex: '0 0 auto',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        borderRadius: '30px',
        backgroundColor: 'rgb(38, 43, 52)',
        display: 'flex',
        alignContent: 'center',
        padding: '40px',
        marginRight: '20px',
        marginBottom: '20px',
      }}
    >
      {children}
    </div>
  );
};
export default InfoCard;
