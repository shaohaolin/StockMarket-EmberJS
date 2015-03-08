/**
 * Created by kurt on 15-3-2.
 */
StockMarket.PlaceSellOrderController = Ember.Controller.extend({

    actions: {
        submitSellOrder: function(model) {

            var sellPrice = this.get('sellPrice');
            var sellVolume = this.get('sellVolume');
            var listOfBuy = model.get('buyOrders').sortBy('bidPrice').reverse();
            var volumeSold = 0;
            var match_index = 0;

            if (sellPrice & sellVolume) {

                for (var i = 0; i < model.get('buyOrders').content.length; i++) {
                    var temBuyPrice = parseFloat(listOfBuy[i].get('bidPrice'));
                    console.log("Buy Price:" + temBuyPrice);
                    if (parseFloat(temBuyPrice) >= parseFloat(this.get('sellPrice'))) {
                        var temBuyVolume = listOfBuy[i].get('bidVolume');
                        console.log("Buy Volume" + temBuyVolume);

                        var match_id = listOfBuy[i].get('id');
                        for (var j = 0; j < model.get('buyOrders').content.length; j++) {
                            if (match_id == model.get('buyOrders').content[i].get('id')) {
                                match_index = j;
                                break;
                            }
                        }

                        //sellVolume is more than bidVolume
                        if (parseInt(this.get('sellVolume')) > parseInt(temBuyVolume)) {
                            volumeSold = parseInt(volumeSold) + parseInt(temBuyVolume);
                            sellVolume = parseInt(this.get('sellVolume')) - parseInt(temBuyVolume);
                            this.set('sellVolume', sellVolume);
                            model.set('currentPrice', temBuyPrice);
                            model.get('buyOrders').content[match_index].destroyRecord();
                            i--;
                        }

                        //sellVolume is equal to buyVolume
                        else if (parseInt(sellVolume) == parseInt(temBuyVolume)) {
                            volumeSold = parseInt(volumeSold) + parseInt(temBuyVolume);
                            sellVolume = 0;
                            this.set('sellVolume', sellVolume);
                            model.set('currentPrice', temBuyPrice);
                            model.get('buyOrders').content[match_index].destroyRecord();
                            break;
                        }

                        //sellVolume is less than buyVolume
                        else if (parseInt(sellVolume) < parseInt(temBuyVolume)) {
                            volumeSold = parseInt(volumeSold) + parseInt(temBuyVolume);
                            sellVolume = 0;
                            model.set('currentPrice', temBuyPrice);
                            model.get('buyOrders').objectAt(match_index).set('bidVolume', parseInt(temBuyVolume) - parseInt(sellVolume));
                            model.set('sellVolume', sellVolume);
                            break;
                        }

                    }
                }

                if (parseInt(this.get('sellVolume')) != 0) {
                    this.store.createRecord('SellOrder', {
                        sellPrice: sellPrice,
                        sellVolume: this.get('sellVolume'),
                        companyID: model.id,
                        company: model
                    });
                }

                // manipulate company model data based on the new sellOrder model data
                if (volumeSold > 0) {
                    model.set('shareVolume', parseInt(model.get('shareVolume')+ volumeSold));
                }

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