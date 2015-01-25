T.Models.User = Backbone.DeepModel.extend({
    url: T.API + '/users',
    validation: {
        username: {
            required: true,
            msg: 'Please enter a username'
        },
        email: {
            required: true,
            pattern: 'email',
            msg: 'Please enter a valid email'
        },
        password: {
            minLength: 8
        },
        repeatPassword: {
            equalTo: 'password',
            msg: 'The passwords does not match'
        }
    },

    save: function(attributes, callback) {
        $.ajax({
            type: 'POST',
            url: this.url,
            dataType: 'json',
            crossDomain: true,
            data: this.attributes,
            error: function(jqXHR, status, error){
                console.log(jqXHR);
                console.log(status);
                console.log(error);
            },
            success: function(data, status, jqXHR){
                //console.log(data);
                //console.log(jqXHR);
                //console.log(status);
            }
        }).done(function(data) {
            callback(data);
        });
    }
});
