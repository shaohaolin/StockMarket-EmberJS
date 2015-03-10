/**
 * Created by kurt on 15-2-24.
 */
StockMarket.StockStateSummaryController = Ember.ArrayController.extend({

    theFilter: "none",

    actions: {
        filterFunction: function(choice){
            this.set("theFilter", choice);
        }
    },

    checkFilterMatch: function(theFilter, netchange) {
        if (theFilter == "increase"){
            if (parseFloat(netchange) > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (theFilter == "decrease"){
            if (parseFloat(netchange) < 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    },

    filterCompany: (function (){
        alert(this.get('model'));
        return this.get('model').filter((function(_this){
            return function(company, index, enumerable) {
                if (_this.get("theFilter")) {
                    return _this.checkFilterMatch(_this.get('theFilter'),company.get('netChange'));
                }
                else {
                    return true;
                }
            };
        })(this));
    }).property( "theFilter"),


    //sort companies based on Company Name alphabet
    sortProperties: ['companyName:asc'],
    sortedCompany: Ember.computed.sort('filterCompany','sortProperties')

    /*
    sortBuyOrderPrice : ['bidPrice:asc'],
    sortBuyOrders : Ember.computed.sort('model.buyOrders', 'sortBuyOrderPrice'),

    sortSellOrderPrice : ['sellPrice:asc'],
    sortSellOrders : Ember.computed.sort('model.sellOrders', 'sortSellOrderPrice')
    */

});