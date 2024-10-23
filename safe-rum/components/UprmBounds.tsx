// CircleComponent.tsx
import React from 'react';
import { Circle } from 'react-native-maps';

interface CircleComponentProps {
  latitude: number;
  longitude: number;
  radius: number;
  strokeWidth: number;
  strokeColor: string;
}

const CircleComponent: React.FC<CircleComponentProps> = ({ latitude, longitude, radius, strokeWidth, strokeColor }) => {
  return (
    <Circle
      center={{
        latitude: latitude,
        longitude: longitude,
      }}
      radius={radius}
      strokeWidth={strokeWidth}
      strokeColor={strokeColor}
    />
  );
};

export default CircleComponent;
