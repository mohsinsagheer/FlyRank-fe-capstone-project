export type OrderStatusStep = 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';

export interface OrderStatusEvent {
  step: OrderStatusStep;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

export interface OrderItemDetail {
  productName: string;
  category: string;
  quantity: number;
  price: number;
  image: string;
}

export interface OrderTrackingDetails {
  orderId: string;
  customerName: string;
  email: string;
  orderDate: string;
  estimatedDelivery: string;
  carrier: string;
  trackingNumber: string;
  shippingAddress: string;
  status: OrderStatusStep;
  timeline: OrderStatusEvent[];
  items: OrderItemDetail[];
  totalAmount: number;
}
