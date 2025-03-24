import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NoData from '../components/NoData';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showMap, setShowMap] = useState(false);

  // Mock delivery status - in a real app, this would come from your backend
  const deliveryStatuses = {
    'processing': { text: 'Processing', color: 'bg-yellow-500', progress: 25 },
    'shipped': { text: 'Shipped', color: 'bg-blue-500', progress: 50 },
    'out-for-delivery': { text: 'Out for Delivery', color: 'bg-orange-500', progress: 75 },
    'delivered': { text: 'Delivered', color: 'bg-green-500', progress: 100 }
  };

  // Mock delivery location - in a real app, this would come from your delivery tracking system
  const getDeliveryLocation = (orderId) => {
    // This is just a mock - in reality you'd fetch this from your backend
    const locations = {
      'order1': { lat: 28.6139, lng: 77.2090 }, // Delhi
      'order2': { lat: 19.0760, lng: 72.8777 }, // Mumbai
      'order3': { lat: 12.9716, lng: 77.5946 }  // Bangalore
    };
    return locations[orderId] || { lat: 28.6139, lng: 77.2090 }; // Default to Delhi
  };

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setShowMap(true);
  };

  const closeMap = () => {
    setShowMap(false);
    setSelectedOrder(null);
  };

  return (
    <div className="pb-10">
      <div className='bg-white shadow-md p-3 font-semibold'>
        <h1 className="text-xl">My Orders</h1>
      </div>
      
      {!orders[0] && <NoData />}
      
      {orders.map((order, index) => {
        // For demo purposes - in a real app, this would come from your backend
        const statusKey = Object.keys(deliveryStatuses)[index % 4] || 'processing';
        const status = deliveryStatuses[statusKey];
        
        return (
          <div 
            key={order._id+index+"order"} 
            className='order rounded p-4 text-sm bg-white shadow-sm my-3 mx-2'
          >
            <div className="flex justify-between items-start mb-2">
              <p className="font-semibold">Order #: {order?.orderId}</p>
              <span className={`px-2 py-1 rounded-full text-xs text-white ${status.color}`}>
                {status.text}
              </span>
            </div>
            
            {/* Delivery Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${status.progress}%` }}
              ></div>
            </div>
            
            <div className='flex gap-3 mb-3'>
              <img
                src={order.product_details.image[0]} 
                className='w-14 h-14 object-cover'
                alt={order.product_details.name}
              />  
              <div>
                <p className='font-medium'>{order.product_details.name}</p>
                <p className="text-gray-600">Qty: {order.quantity}</p>
                <p className="font-semibold">₹{order.total_amount}</p>
              </div>
            </div>
            
            <div className="flex justify-between mt-3">
              <button 
                className="text-blue-600 text-sm font-medium"
                onClick={() => handleTrackOrder(order)}
              >
                Track Order
              </button>
              <button className="text-gray-600 text-sm font-medium">
                Order Details
              </button>
            </div>
          </div>
        );
      })}
      
      {/* Google Maps Modal */}
      {showMap && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Track Order #{selectedOrder.orderId}</h2>
              <button onClick={closeMap} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <div className="h-64 mb-4">
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={getDeliveryLocation(selectedOrder.orderId)}
                  zoom={14}
                >
                  <Marker position={getDeliveryLocation(selectedOrder.orderId)} />
                </GoogleMap>
              </LoadScript>
            </div>
            
            <div className="text-sm">
              <p className="font-medium">Delivery Status: {deliveryStatuses[Object.keys(deliveryStatuses)[index % 4]].text}</p>
              <p className="text-gray-600">Estimated Delivery: Tomorrow, 3-6 PM</p>
              <div className="mt-2">
                <p className="font-medium">Delivery Partner: FastDeliver Logistics</p>
                <p>Contact: +91 98765 43210</p>
              </div>
            </div>
            
            <button 
              onClick={closeMap}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
