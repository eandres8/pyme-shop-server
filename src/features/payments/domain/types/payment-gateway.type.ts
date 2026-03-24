export type ISegmentedZoneVariables = {
  readonly data: Merchant;
  readonly meta: Record<string, any>;
};

export type Merchant = {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly contact_name: string;
  readonly phone_number: string;
  readonly active: boolean;
  readonly logo_url: null;
  readonly legal_name: string;
  readonly legal_id_type: string;
  readonly legal_id: string;
  readonly public_key: string;
  readonly accepted_currencies: string[];
  readonly validated_legal_id: string;
  readonly fraud_javascript_key: null;
  readonly fraud_groups: any[];
  readonly accepted_payment_methods: string[];
  readonly payment_methods: PaymentMethod[];
  readonly presigned_acceptance: Presigned;
  readonly presigned_personal_data_auth: Presigned;
  readonly click_to_pay_dpa_id: null;
  readonly mcc: null;
  readonly acquirer_id: null;
};

export type PaymentMethod = {
  readonly name: string;
  readonly payment_processors: PaymentProcessor[];
};

export type PaymentProcessor = {
  readonly name: string;
};

export type Presigned = {
  readonly acceptance_token: string;
  readonly permalink: string;
  readonly type: string;
};
