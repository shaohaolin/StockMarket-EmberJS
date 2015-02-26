/**
 * Created by kurt on 15-2-23.
 */
StockMarket.Router.map(function() {
    // put your routes here
    this.resource('stockStateSummary', {path: '/'}, function (){
        this.resource('marketByOrder', function (){
            this.resource('marketByPrice', function(){
                this.resource('symbol');
            });
        });

        this.resource('placeBidOrder');
        this.resource('placeSellOrder');

    });

});
