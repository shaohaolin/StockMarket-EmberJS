/**
 * Created by kurt on 15-3-5.
 */
Ember.Handlebars.registerBoundHelper('marketByOrderView', function (model, sortedBuyOrders, sortedSellOrders) {

        var length = sortedBuyOrders.length < sortedSellOrders.length ? sortedSellOrders.length : sortedBuyOrders.length;

        var tableView = "";
        console.log('market by order view');

        tableView =  '<table class="table table-bordered buyByOrder"> <thead> <tr> <th colspan="2">Buy</th> <th colspan="2">Sell</th> </tr> <tr> <th>Volume</th> <th>Price</th> <th>Price</th> <th>Volume</th> </tr> </thead> <tbody>';

        for (var i = 0; i < length; i++) {

            if (i < sortedBuyOrders.length) {

                var temBidVolume = sortedBuyOrders[i].get('bidVolume');
                //console.log(temBidVolume);
                var temBidPrice = sortedBuyOrders[i].get('bidPrice');
                //console.log(temBidPrice);

                tableView = tableView + "<tr> <th>" + temBidVolume +"</th> <th>" + temBidPrice + "</th>";
            }
            else {
                tableView = tableView + "<tr><th></th> <th></th>";
            }

            if (i < sortedSellOrders.length) {
                var temSellPrice = sortedSellOrders[i].get('sellPrice');
                //console.log(temSellPrice);
                var temSellVolume = sortedSellOrders[i].get('sellVolume');
                //console.log(temBidVolume);

                tableView = tableView + "<th>" + temSellPrice + "</th> <th>" + temSellVolume +"</th> </tr>";
            }
            else {
                tableView = tableView + "<th> </th> <th></th> </tr>";
            }
        }

        tableView += "</tbody> </table>";

        return new Ember.Handlebars.SafeString(tableView);
});

Ember.Handlebars.helper('priceView', function (model, sortedBuyOrders, sortedSellOrders) {

    var length = sortedBuyOrders.length < sortedSellOrders.length ? sortedSellOrders.length : sortedBuyOrders.length;

    var tableContent = "";
    console.log("In market by Price View");

    tableContent = '<table class="table table-bordered byPrice"> <thead> <tr> <th colspan="3">Buy</th> <th colspan="3">Sell</th> </tr> <tr> <th>#</th> <th>Volume</th> <th>Price</th> <th>Price</th> <th>Volume</th> <th>#</th> </tr> </thead> <tbody>';

    var buyIndex = 0;
    var sellIndex = 0;


    for (var i = 0; i < length; i++){

        if (i < sortedBuyOrders.length) {

            if (parseInt(buyIndex) < parseInt(sortedBuyOrders.length)){
                i = buyIndex;
            }

            var firstBidVolume = sortedBuyOrders[i].get('bidVolume');
            var firstBidPrice = sortedBuyOrders[i].get('bidPrice');
            var numOfMatch = 1;

            for (var j = i + 1; j < sortedBuyOrders.length; j++) {

                if(parseInt(firstBidPrice) == parseInt(sortedBuyOrders[j].get('bidPrice'))) {
                    firstBidVolume = parseInt(firstBidVolume) + parseInt(sortedBuyOrders[j].get('bidPrice'));
                    numOfMatch++;
                }
                else {
                    break;
                }
            }

            if (parseInt(numOfMatch) > 1) {
                buyIndex += numOfMatch - 1;
            }
            else {
                buyIndex++;
            }


            tableContent = tableContent + "<tr> <th>" + numOfMatch + "</th> <th>" + firstBidVolume + "</th> <th>" + firstBidPrice + "</th>";
        }
        else {
            tableContent = tableContent + "<tr><th></th> <th></th> <th></th>";
        }


        if (i < sortedSellOrders.length) {

            if (parseInt(sellIndex) < parseInt(sortedSellOrders.length)){
                i = sellIndex;
            }
            var firstSellVolume = sortedSellOrders[i].get('sellVolume');
            var firstSellPrice = sortedSellOrders[i].get('sellPrice');
            var numOfMatching = 1;

            for (var j = i + 1; j < sortedSellOrders.length; j++) {
                if (parseInt(firstSellPrice) == parseInt(sortedSellOrders[j].get('sellPrice'))) {
                    firstSellVolume = parseInt(firstSellVolume) + parseInt(sortedSellOrders[j].get('sellPrice'));
                    numOfMatching++;
                }
                else {
                    break;
                }
            }

            if (parseInt(numOfMatching) > 1) {
                sellIndex += numOfMatching - 1;
            }
            else {
                sellIndex++;
            }

            tableContent = tableContent + "<th>" + firstSellPrice + "</th> <th>" + firstSellVolume + "</th> <th>" + numOfMatching + "</th> </tr>";
        }
        else {
            tableContent = tableContent + "<th></th><th></th><th></th></tr>";
        }

    }

    tableContent = tableContent + "</tbody> </table>";
    return new Ember.Handlebars.SafeString(tableContent);
});

