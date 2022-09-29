import React from 'react';

interface BannerProps {
  children: React.ReactNode;
}

export const Banner = (props: BannerProps) => (
  <div className="banner">
    <div className="container">{props.children}</div>
  </div>
);
