/**
 * Created by kurt on 15-2-23.
 */
StockMarket.Router.map(function() {
    // put your routes here
    this.resource('stockStateSummary', {path: '/'}, function (){

        this.resource('marketByOrder',{path:':company_id'});
        this.resource('placeBidOrder', {path:'/bidOrder/:company_id'});
        this.resource('placeSellOrder', {path:'/sellOrder/:company_id'});

    });

});
