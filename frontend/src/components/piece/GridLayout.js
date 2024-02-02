import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import MainContent from './MainContent';
import TankData from './TankData';
import TankInputData from './TankInputData';
import TankOutputData from './TankOutputData';
import TankValve from './TankValve';
import TankInputValve from './TankInputValve';
import TankOutputValve from './TankOutputValve';

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayout = () => {
    const layout = [
        { i: 'chart1', x: 0, y: 0, w: 3.7, h: 2.5, isDraggable: false },
        { i: 'chart2', x: 3.9, y: 0, w: 3.9, h: 1.4, isDraggable: false },
        { i: 'chart3', x: 7.9, y: 0, w: 3.9, h: 1.4, isDraggable: false},
        { i: 'chart4', x: 3.9, y: 2, w: 5.3, h: 1.8, isDraggable: false},
        { i: 'chart5', x: 0.1, y: 2.6, w: 3.8, h: 0.6, isDraggable: false},
        { i: 'chart6', x: 9.3, y: 1.35, w: 2.5, h: 0.85, isDraggable: false},
        { i: 'chart7', x: 9.3, y: 1.7, w: 2.5, h: 0.85, isDraggable: false},
      ];

  const gridStyles = {
    color: 'white'
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={200}
      width={1200}
      style={gridStyles}
    >
      {/* 기상 관련 차트 */}
      <div key="chart1">
        <MainContent />
      </div>
      <div key="chart2">
        <TankInputData />
      </div>
      <div key="chart3">
        <TankOutputData />
      </div>
      <div key="chart4">
        <TankData />
      </div>
      <div key="chart5">
        <TankValve />
      </div>
      <div key="chart6">
        <TankInputValve />
      </div>
      <div key="chart7">
        <TankOutputValve />
      </div>
    </ResponsiveGridLayout>
  );
};

export default GridLayout;
