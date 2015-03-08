/**
 * Created by kurt on 15-3-1.
 */
StockMarket.PlaceBidOrderController = Ember.Controller.extend({

    actions: {
        submitOrder: function (model) {

            var buyPrice = this.get('bidPrice');
            var buyVolume = this.get('bidVolume');
            var listOfSell = model.get('sellOrders');
            var volumeSold = 0;

            if (buyPrice & buyVolume) {

                    for (var i = 0; i < model.get('sellOrders').content.length; i++) {
                        var temSellPrice = parseFloat(listOfSell.content[i].get('sellPrice'));
                        console.log("Sell Price:" + temSellPrice);
                        if (parseFloat(buyPrice) >= temSellPrice) {
                            var temSellVolume = listOfSell.content[i].get('sellVolume');
                            console.log("Sell Volume" + temSellVolume);

                            //buyVolume is more than sellVolume
                            if (parseInt(this.get('bidVolume')) > temSellVolume) {
                                volumeSold = parseInt(volumeSold) + parseInt(temSellVolume);
                                buyVolume = parseInt(this.get('bidVolume')) - parseInt(temSellVolume);
                                this.set('bidVolume', buyVolume);
                                model.get('sellOrders').content[i].deleteRecord();
                                model.save();
                                i--;
                            }

                            //buyVolume is equal to sellVolume
                            else if (parseInt(buyVolume) == temSellVolume) {
                                volumeSold = parseInt(volumeSold) + parseInt(temSellVolume);
                                buyVolume = 0;
                                this.set('bidVolume', buyVolume);
                                model.get('sellOrders').content[i].deleteRecord();
                                model.save();
                                break;
                            }

                            //buyVolume is less than sellVolume
                            else if (parseInt(buyVolume) < parseInt(temSellVolume)) {
                                volumeSold = parseInt(volumeSold) + parseInt(temSellVolume);
                                buyVolume = 0;
                                model.get('sellOrders').objectAt(i).set('sellVolume', parseInt(temSellVolume) - parseInt(buyVolume));
                                model.set('bidVolume', buyVolume);
                                break;
                            }

                        }
                    }

                if (parseInt(this.get('bidVolume')) != 0) {
                    console.log("buyVolume Left:" + buyVolume);
                    this.store.createRecord('BuyOrder', {
                        bidPrice: buyPrice,
                        bidVolume: this.get('bidVolume'),
                        companyID: model.id,
                        company: model
                    });
                }

                // manipulate company model data based on the new buyOrder model data
                if (volumeSold > 0) {
                    console.log("current Price:"+ buyPrice);
                    console.log("share volume:"+ parseInt(model.get('shareVolume')+ volumeSold));
                    model.set('currentPrice', buyPrice);
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

                // clear the input form
                this.set('bidPrice', '');
                this.set('bidVolume', '');

                //redirect to marketByOrder to select company ID
                this.transitionToRoute('marketByOrder', model.id);
            }
        },

        abortBuyOrder: function () {
            this.set('bidPrice', ' ');
            this.set('bidVolume', ' ');
            this.transitionToRoute('stockStateSummary');
        }
    }
});