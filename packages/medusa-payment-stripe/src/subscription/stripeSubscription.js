// Extend the base Stripe plugin
class StripeSubscriptionService extends StripeService {
    constructor({ stripeClient, options }) {
      super({ stripeClient, options });
    }
  
    async createSubscription(customerId, priceId) {
      // Call the Stripe API to create a new subscription
      const subscription = await this.stripeClient.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        // Add other subscription parameters as needed
      });
      return subscription;
    }

  // You can add more methods here to update, cancel, retrieve, and list subscriptions
}

///not needed? 
///app.post('/webhooks/stripe', async (req, res) => {
  ///const event = req.body;

 /// switch (event.type) {
   /// case 'invoice.payment_succeeded':
      // Handle successful payment for a subscription
   ///   break;
   /// case 'customer.subscription.deleted':
      // Handle subscription cancellation
   ///   break;
    // Add other subscription-related event cases as needed
 /// }

 /// res.status(200).end();
///});