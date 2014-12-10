T.Collections.Users = Backbone.Collection.extend({

    url: T.API + '/users',
    model: T.Models.User

});
