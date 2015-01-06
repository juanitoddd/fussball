var T = window.T || {};
_.extend(T, {
    // Top level view that is currently initialized and displayed.
    activeMainView: null,
    config: {},

    API: 'http://api.fussball.ecuation.com',

    // Initialize collections and main classes
    initialize: function() {

        this.container = $('#container');

        this.dashboard_tpl = _.template(
            $( "script#dashboard-tpl" ).html()
        );

        this.teams_tpl = _.template(
            $( "script#teams-tpl" ).html()
        );

        this.login_tpl = _.template(
            $( "script#login-tpl" ).html()
        );

        // User login

        // Create main collections, bootstrapped in the html view
        this.teams = new T.Collections.Teams();
        this.users = new T.Collections.Users();
        this.matches = new T.Collections.Matches();

        //this.persons = new T.Collections.Persons();
        //this.comments = new T.Collections.Comments();
        //this.sections = new T.Collections.Sections();

        //this.tasksRouter = new T.Routers.Tasks();

        //T.WindowResizeManager.initialize();
        //T.ListSelectionManager.initialize();
        //T.ScrollableManager.initialize();

        //T.Collections.Tasks.LazyLoading.loadTasks('active');

        T.debug = T.parseURL('debug') == 'true';
        T.trace = T.parseURL('trace') == 'true';

        T.lastUpdated = new Date();
        //T.Preferences.initialize();

        if(this.User.logged){
            //this.dashboard();
            this.teams_view();
        }else
            this.login();

    },

    login: function(){
        this.container.html(this.login_tpl());
    },

    dashboard: function(){
        this.matches.fetch({
            //reset: true,
            success: function(){
                T.container.html(T.dashboard_tpl({matches:T.matches.models}));
            },
            error: function(){
                console.log('Error');
            }
        });
    },

    teams_view: function(){
        this.teams.fetch({
            //reset: true,
            success: function(){
                T.alert('Success');
                T.container.html(T.teams_tpl({teams:T.teams.models}));
            },
            error: function(msg){
                console.log(T);
                T.alert('Error: ' + msg);
                console.log('Error');
            }
        });
    },

    // Start backbone router and history
    start: function() {
        Backbone.history.start();
    },

    alert: function(message) {
        $('#debug').html(message);
    },

    // Replaces console.log
    log: function(message, values, important, trace) {
        // Message (string) Values (array) Important (boolean) Trace (boolean)
        // Important & Trace make sure stuff is logged & traced even if T.debug is off
        if (T.debug || important) console.log('T.log| ', message, values);
        if (T.trace || trace) console.log(Error().stack);
    },

    // Parses specific URL params and returns their value
    parseURL: function(parameter) {
        var query = window.location.search.substring(1),
            vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (!pair[0] || !pair[1]) return;
            // Cut off trailing slash from value of last parameter
            if (i == (vars.length-1)) pair[1] = pair[1].substr(0, pair[1].length-1);
            if (decodeURIComponent(pair[0]) == parameter) {
                return decodeURIComponent(pair[1]);
            }
        }
    }
});

// Namespacing
_.extend(T, {
    User : {
        logged : true //Temp
    },
    Options: {},
    Routers: {},
    Views: {},
    Models: {},
    Collections: {}
});