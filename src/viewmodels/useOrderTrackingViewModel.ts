import { useState } from 'react';
import { MOCK_ORDERS } from '../models/mockData';
import type { OrderTrackingDetails } from '../models/Order';

export function useOrderTrackingViewModel() {
  const [searchOrderId, setSearchOrderId] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [activeOrder, setActiveOrder] = useState<OrderTrackingDetails | null>(MOCK_ORDERS['ZEN-98421']); // default mock order
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);

    const query = searchOrderId.trim().toUpperCase();
    if (!query) {
      setErrorMsg('Please enter a valid Order ID (e.g. ZEN-98421 or ZEN-55102)');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (MOCK_ORDERS[query]) {
        setActiveOrder(MOCK_ORDERS[query]);
      } else {
        // Generate dynamic realistic order mock if not in standard list
        const generatedMock: OrderTrackingDetails = {
          orderId: query,
          customerName: emailInput.split('@')[0] || 'Zenith Customer',
          email: emailInput || 'customer@example.com',
          orderDate: '2026-08-02',
          estimatedDelivery: '2026-08-06',
          carrier: 'FedEx Priority Air (#FX-991823)',
          trackingNumber: 'FX-991823',
          shippingAddress: '1540 Broadway, 22nd Floor, New York, NY 10036',
          status: 'processing',
          totalAmount: 599,
          timeline: [
            {
              step: 'confirmed',
              title: 'Order Placed',
              description: 'Payment authorized and order received',
              timestamp: 'Aug 02, 2026 - 10:15 AM',
              completed: true,
              current: false
            },
            {
              step: 'processing',
              title: 'In Processing',
              description: 'Order being packed and verified at fulfillment center',
              timestamp: 'Aug 03, 2026 - 07:45 AM',
              completed: true,
              current: true
            },
            {
              step: 'shipped',
              title: 'Shipped',
              description: 'Awaiting carrier pick up',
              timestamp: 'Estimated Aug 04, 2026',
              completed: false,
              current: false
            },
            {
              step: 'out_for_delivery',
              title: 'Out for Delivery',
              description: 'Local courier dispatch',
              timestamp: 'Estimated Aug 05, 2026',
              completed: false,
              current: false
            },
            {
              step: 'delivered',
              title: 'Delivered',
              description: 'Final delivery confirmation',
              timestamp: 'Estimated Aug 06, 2026',
              completed: false,
              current: false
            }
          ],
          items: [
            {
              productName: 'Apex ProBook 16 M3 Laptop',
              category: 'Laptops',
              quantity: 1,
              price: 599,
              image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80'
            }
          ]
        };
        setActiveOrder(generatedMock);
      }
    }, 600);
  };

  const loadDemoOrder = (id: string) => {
    setSearchOrderId(id);
    if (MOCK_ORDERS[id]) {
      setActiveOrder(MOCK_ORDERS[id]);
      setErrorMsg(null);
    }
  };

  return {
    searchOrderId,
    setSearchOrderId,
    emailInput,
    setEmailInput,
    activeOrder,
    errorMsg,
    isLoading,
    handleSearch,
    loadDemoOrder
  };
}
