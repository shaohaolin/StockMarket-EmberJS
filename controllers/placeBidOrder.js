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

                // manipulate company model data based on the new buyOrder model data
                model.set('currentPrice', buyPrice);
                model.set('shareVolume', buyVolume);

                var currentValue = model.get('value');

                if (currentValue == 0) {
                    model.set('changeIcon', './images/noChange.png');
                }
                else if(currentValue > 0) {
                    model.set('changeIcon', './images/up.png');
                }
                    else {
                    model.set('changeIcon', './images/down.png');
                }

                // clear the input form
                this.set('bidPrice', '');
                this.set('bidVolume', '');

                //redirect to marketByOrder to select company ID
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