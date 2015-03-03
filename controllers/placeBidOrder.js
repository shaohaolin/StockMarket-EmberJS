/**
 * Created by kurt on 15-3-1.
 */
StockMarket.PlaceBidOrderController = Ember.Controller.extend({

    actions: {
        submitOrder: function (model) {

            var buyPrice = this.get('bidPrice');
            var buyVolume = this.get('bidVolume');

            if (buyPrice & buyVolume) {

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
            this.transitionToRoute('stockStateSummary');
        }
    }
});