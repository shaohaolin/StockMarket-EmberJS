
StockMarket = Ember.Application.create({
    LOG_TRANSITIONS: true,
    LOG_ACTIVE_GENERATION: true,
    LOG_VIEW_LOOKUPS: true
});

StockMarket.ApplicationAdapter = DS.FixtureAdapter;

