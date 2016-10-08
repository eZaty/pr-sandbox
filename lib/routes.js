var RoutePermission = function(routeName) {
    if (!Meteor.userId()) {
        Router.go('/login');
        return false;
    } else {
        var roles = ['admin'];
        var groups = Groups.find({
            routes: routeName
        });

        groups.forEach(function(group){
            roles.push(group.slug);
        });

        if(Roles.userIsInRole(Meteor.userId(), roles) || $.inArray('employee', roles) > 0) {
            // console.log(routeName, roles, 'permitted');
            Session.set('ACCESS_GRANTED', true);
            return true;
        }
        else {
            // console.log(routeName, roles, 'prohibited');
            Session.set('ACCESS_GRANTED', false);
            Router.go('/');
            ClientHelper.notify('danger', 'You do not have sufficient access to enter this page. Please <a href="/logout" class="text-white"><u><strong>re-login</strong></u></a> as appropriate user.', true);
            return false;
        }
    }
}

Router.configure({
    layoutTemplate: 'main.layout',
    loadingTemplate: 'loading'
});

// -- public
Router.route('/', {
    name: 'home',
    layoutTemplate: 'main.layout',
    waitOn: function() {
        return [
            Meteor.subscribe('user-roles'),
        ]
    },
    onBeforeAction: function() {
        RoutePermission('home');
        this.next();
    },
    fastRender: true
});


Router.route('/__admin', {
    name: 'adminDashboard',
    layoutTemplate: 'adminLayout',
    waitOn: function () {
        return [
            Meteor.subscribe('user-roles')
        ];
    },
    onBeforeAction: function() {
        RoutePermission('adminDashboard');
        this.next();
    },
    fastRender: true
});

Router.route('/__admin/users', {
    name: 'adminUserList',
    layoutTemplate: 'adminLayout',
    waitOn: function () {
        return [
            Meteor.subscribe('user-roles'),
            Meteor.subscribe('groups')
        ];
    },
    onBeforeAction: function() {
        RoutePermission('adminUserList');
        this.next();
    },
    fastRender: true
});

Router.route('/__admin/groups', {
    name: 'adminUserGroup',
    layoutTemplate: 'adminLayout',
    waitOn: function () {
        return [
            Meteor.subscribe('user-roles'),
            Meteor.subscribe('groups')
        ];
    },
    onBeforeAction: function() {
        RoutePermission('adminUserGroup');
        this.next();
    },
    fastRender: true
});

// -- authentication
Router.route('/login', {
    name: 'login',
    layoutTemplate: 'auth.layout',
    onBeforeAction: function() {
        if (Meteor.userId()) {
            Router.go('/');
        }
        this.next();
    },
    fastRender: true
});

Router.route('/logout', {
    name: 'logout',
    layoutTemplate: 'auth.layout',
    onBeforeAction: function() {
        if (Meteor.userId()) {
            Meteor.logout(function(){
                Router.go('/login');
            });
        }
        this.next();
    },
    fastRender: true
});



// -- customized routes here
Router.route('/demo', {
    name: 'demo',
    layoutTemplate: 'main.layout',
    waitOn: function() {
        return [
            Meteor.subscribe('user-roles'),
            Meteor.subscribe('allUsers')
        ]
    },
    onBeforeAction: function() {
        RoutePermission('demo');
        this.next();
    },
    fastRender: true
});
