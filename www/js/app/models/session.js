T.Models.SessionModel = Backbone.DeepModel.extend({
    defaults: {
        sessionId: "",
        username: "",
        password: "",
        id: ""
    },

    isAuthorized: function(){
        return Boolean(this.get("sessionId"));
    }
});
