// PizzaList.js
import React from 'react';

const PizzaList = ({ orders, moveOrder, cancelOrder }) => {
  return (
    <div>
      <h2>Main Section</h2>
      <div>
        {orders.map((order) => (
          <div key={order.id} className={order.overdue ? 'overdue' : ''}>
            <p>
              Order Id: {order.id} | Stage: {order.stage} | Time Elapsed: {formatTimeElapsed(order.stageStartTime)}
            </p>
            {order.stage !== 'Order Picked' && (
              <>
                <button onClick={() => moveOrder(order.id, 'Order in Making')}>Next</button>
                <button onClick={() => moveOrder(order.id, 'Order Picked')}>Picked</button>
              </>
            )}
            {order.stage === 'Order Placed' && (
              <button onClick={() => cancelOrder(order.id)}>Cancel</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const formatTimeElapsed = (startTime) => {
  const elapsed = Date.now() - startTime;
  const minutes = Math.floor(elapsed / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  return `${minutes} min ${seconds} sec`;
};

export default PizzaList;
