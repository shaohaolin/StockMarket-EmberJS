/**
 * Created by kurt on 15-3-2.
 */
StockMarket.PlaceSellOrderController = Ember.Controller.extend({

    actions: {
        submitSellOrder: function(model) {

            var sellPrice = this.get('sellPrice');
            var sellVolume = this.get('sellVolume');

            if (sellPrice & sellVolume) {

                this.store.createRecord('SellOrder', {
                    sellPrice: sellPrice,
                    sellVolume: sellVolume,
                    companyID: model.id,
                    company: model
                });

                this.set('sellPrice', '');
                this.set('sellVolume', '');
                this.transitionToRoute('marketByOrder', model.id);
            }
        },

        abortSellOrder: function () {
            this.set('sellPrice', '');
            this.set('sellVolume', '');
            this.transitionToRoute('stockStateSummary');
        }
    }
});