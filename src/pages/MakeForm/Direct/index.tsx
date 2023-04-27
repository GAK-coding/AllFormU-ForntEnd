import React, { useState } from 'react';
import { SortablePane, Pane } from 'react-sortable-pane';

export default function MakeFormDirect() {
  const [isClick, setIsClick] = useState(false);

  const handleMouseOver = () => {
    setIsClick(true);
  };

  const handleMouseOut = () => {
    setIsClick(false);
  };

  console.log(isClick);

  return (
    <div style={{ fontSize: '4rem' }}>
      <SortablePane isSortable={isClick} direction="vertical" margin={20}>
        {[0, 1, 2].map((key) => (
          <div key={key} style={{ border: '1px solid', width: '100rem' }}>
            <Pane key={key}>
              <div
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                style={{ border: '1px solid', width: '50%' }}
              >
                00{key}
              </div>
            </Pane>
          </div>
        ))}
      </SortablePane>
    </div>
  );
}
