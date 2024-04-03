import { useEffect } from 'react';
import { useMyContext } from '../Context';


// 차트에 데이터 수를 10개로 유지하면서 업데이트 하는 커스텀 훅
export const useCustomEffect = (chart, data) => {
    const {timeList} = useMyContext();
    useEffect(() => {
        if (chart) {
          const currentIndex = chart.data.labels.length;
          let x = timeList[timeList.length-1];
          let y = data[data.length-1];
      
          if (currentIndex >= 10) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
          }
      
          // 새로운 데이터와 레이블을 차트에 추가합니다.
          chart.data.labels.push(x);
          chart.data.datasets[0].data.push(y);
      
          // 차트를 업데이트합니다.
          chart.update();
      }
      
      }, [data]);
}