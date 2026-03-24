export type TPaymentParams = {
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
};

export type TPaymentResponse = {
  readonly paymentId: string;
  readonly checkoutUrl: string;
};

export type TPaymentMerchantResponse = {
  readonly accepted_currency: string;
  readonly payment_methods: string[];
  readonly acceptance_token: string;
};
