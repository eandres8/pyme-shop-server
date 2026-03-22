export type TPaymentParams = {
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
};

export type TPaymentResponse = {
  readonly paymentId: string;
  readonly checkoutUrl: string;
};
