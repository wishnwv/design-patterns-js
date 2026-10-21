// The bad, OCP-violating implementation

/**
 * In this code, the CheckoutService has to know about every payment method 
 * and uses a switch statement to handle them. 
 * If you want to add Apple Pay, Google Pay, or Crypto tomorrow, 
 * you are forced to modify this class.
 */

export enum PaymentType {
    CREDIT_CARD = "CREDIT_CARD",
    PAYPAL = "PAYPAL",
    BANK_TRANSFER = "BANK_TRANSFER"
}

interface PaymentMethod {
    process(amount: number, details: any): void;
}


class CheckoutService {
    public processPayment(amount: number, details: any, paymentMethod: PaymentMethod): void {
        // It doesn't care what payment method it is, as long as it has a .process() method
        paymentMethod.process(amount, details);
    }
}

class CreditCardPayment implements PaymentMethod {

    process(amount:number,details:any) {
        if (!details.cardNumber) throw new Error("Card number required");
        console.log(`Processing $${amount} via Credit Card [Card: ${details.cardNumber}]`);
        // Complex Stripe/Gateway SDK code here...
        return;
    }
}


// --- Usage ---
const checkout = new CheckoutService();
checkout.processPayment(150.00,{ cardNumber: "4242-4242-4242-4242" }, new CreditCardPayment());
