/**
 * Created by kurt on 15-3-1.
 */
StockMarket.PlaceBidOrderController = Ember.Controller.extend({

    actions: {
        submitOrder: function (model) {

            var buyPrice = this.get('bidPrice');
            var buyVolume = this.get('bidVolume');

            if (buyPrice & buyVolume) {
                console.log(buyPrice);
                console.log(buyVolume);
                console.log(model.id);
                console.log("Submitted!");

                this.store.createRecord('BuyOrder', {
                   bidPrice: buyPrice,
                   bidVolume: buyVolume,
                   companyID: model.id,
                   company: model
                });

                this.set('bidPrice', '');
                this.set('bidVolume', '');

                this.transitionToRoute('marketByOrder', model.id);
            }

        },

        abortion: function () {
            this.set('bidPrice', ' ');
            this.set('bidVolume', ' ');

            console.log("Cancel the transaction!");
        }
    }
});