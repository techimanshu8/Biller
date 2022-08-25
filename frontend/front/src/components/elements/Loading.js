import React from 'react';

const LoadingGif = (
  <div className="im" alt="background">
    <div
      style={{
        left: '46%',
        position: 'fixed',
        top: '40%',
        textAlign: 'center',
      }}
    >
      <i className="fa fa-cog fa-8x fa-spin" style={{ color: 'white' }} />
      <div style={{ color: 'white', position: 'absolute' }}>Setting Things Up!</div>
    </div>
  </div>
);

const Loading = () => {
  return (
    <div className="im" alt="background">
      <div
        style={{
          left: '46%',
          position: 'fixed',
          top: '40%',
          textAlign: 'center',
        }}
      >
        <i className="fa fa-cog fa-8x fa-spin" style={{ color: 'white' }} />
        <div style={{ color: 'white', position: 'absolute' }}>Setting Things Up!</div>
      </div>
    </div>
  );
};

export { Loading, LoadingGif };
