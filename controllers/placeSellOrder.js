/**
 * Created by kurt on 15-3-2.
 */
StockMarket.PlaceSellOrderController = Ember.Controller.extend({

    actions: {
        submitSellOrder: function(model) {

            var sellPrice = this.get('sellPrice');
            var sellVolume = this.get('sellVolume');
            var listOfBuy = model.get('buyOrders');
            var volumeSold = 0;

            if (sellPrice & sellVolume) {

                for (var i = 0; i < model.get('buyOrders').content.length; i++) {
                    var temBuyPrice = parseFloat(listOfBuy.content[i].get('bidPrice'));
                    console.log("Buy Price:" + temBuyPrice);
                    if (parseFloat(sellPrice) >= temBuyPrice) {
                        var temBuyVolume = listOfBuy.content[i].get('bidVolume');
                        console.log("Buy Volume" + temBuyVolume);

                        //sellVolume is more than bidVolume
                        if (parseInt(this.get('sellVolume')) > temBuyVolume) {
                            volumeSold = parseInt(volumeSold) + parseInt(temBuyVolume);
                            sellVolume = parseInt(this.get('sellVolume')) - parseInt(temBuyVolume);
                            this.set('sellVolume', sellVolume);
                            model.set('currentPrice', temBuyPrice);
                            model.get('buyOrders').content[i].destroyRecord();
                            model.save();
                            i--;
                        }

                        //sellVolume is equal to buyVolume
                        else if (parseInt(sellVolume) == temBuyVolume) {
                            volumeSold = parseInt(volumeSold) + parseInt(temBuyVolume);
                            sellVolume = 0;
                            this.set('sellVolume', sellVolume);
                            model.set('currentPrice', temBuyPrice);
                            model.get('buyOrders').content[i].destroyRecord();
                            model.save();
                            break;
                        }

                        //sellVolume is less than buyVolume
                        else if (parseInt(sellVolume) < parseInt(temBuyVolume)) {
                            volumeSold = parseInt(volumeSold) + parseInt(temBuyVolume);
                            sellVolume = 0;
                            model.set('currentPrice', temBuyPrice);
                            model.get('buyOrders').objectAt(i).set('bidVolume', parseInt(temBuyVolume) - parseInt(sellVolume));
                            model.set('sellVolume', sellVolume);
                            break;
                        }

                    }
                }

                if (parseInt(this.get('sellVolume')) != 0) {
                    this.store.createRecord('SellOrder', {
                        sellPrice: sellPrice,
                        sellVolume: sellVolume,
                        companyID: model.id,
                        company: model
                    });
                }

                // manipulate company model data based on the new sellOrder model data
                if (volumeSold > 0) {
                    model.set('shareVolume', parseInt(model.get('shareVolume')+ volumeSold));
                }

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