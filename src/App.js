// App.js
import React, { useState, useEffect } from 'react';
import PizzaForm from './PizzaForm';
import PizzaList from './PizzaList';

const App = () => {
  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    // Check if any pizza has been in the same stage for more than 3 minutes
    const intervalId = setInterval(() => {
      const updatedOrders = orders.map(order => {
        if (order.stageStartTime && order.stage !== 'Order Picked') {
          const elapsedTime = Date.now() - order.stageStartTime;
          const elapsedMinutes = Math.floor(elapsedTime / 60000);
          if (elapsedMinutes > 3) {
            return { ...order, overdue: true };
          }
        }
        return order;
      });

      setOrders(updatedOrders);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [orders]);

  const placeOrder = (pizza) => {
    if (orderCount < 10) {
      setOrders([...orders, { ...pizza, id: orderCount + 1, stage: 'Order Placed', stageStartTime: Date.now(), overdue: false }]);
      setOrderCount(orderCount + 1);
    } else {
      alert('Not taking any order for now');
    }
  };

  const moveOrder = (orderId, actionType) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        const stageStartTime = Date.now();
        return { ...order, stage: actionType, stageStartTime, overdue: false };
      }
      return order;
    });

    setOrders(updatedOrders);
  };

  const cancelOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    setOrderCount(orderCount - 1);
  };

  return (
    <div>
      
      <hr></hr>
      <hr></hr>
      <h1 align="center" >Pizza Shop</h1>
      <hr></hr>
      <hr></hr>
      


      <PizzaForm placeOrder={placeOrder} />
      <PizzaList
        orders={orders}
        moveOrder={moveOrder}
        cancelOrder={cancelOrder}
      />
    </div>
  );
};

export default App;
