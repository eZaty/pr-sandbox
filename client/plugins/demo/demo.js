Template.demo.rendered = function(){
    Session.set('selectedUser', null);
    $('#logo-placeholder').html('<img src="/images/webe-playroom-beta.png" />');
}

Template.demo.helpers({
    users: function() {
        var users = Meteor.users.find();
        users.forEach(function(user){
            console.log("user", user); //--> debug will appear at browser console
        })
        return users;
    },
    userDetails: function() {
        return Meteor.users.findOne({
            _id: Session.get('selectedUser')
        });
    },
});

Template.demo.events({
    'click #event-btn': function(e) {
        e.preventDefault();
        var elem = $(e.currentTarget);
        var userId = elem.data('userid');
        Session.set('selectedUser', userId);
    },

    'click #add-user': function(e) {
        e.preventDefault();
        var elem = $(e.currentTarget);
        console.log("message");
    },

    'click #add-now': function(e) {
        e.preventDefault();
        var elem = $(e.currentTarget);
        var params = {
            name: $('#input-name').val(),
            username: $('#input-name').val(),
            password: 'Password!',
            email: $('#input-email').val(),
            title: $('#input-title').val(),
            department: $('#input-department').val(),
            roles: ['employee']
        }
        // console.log("params", params);

        Meteor.call('addEmployee', params, function(error, result){
            if(error) console.log("error", error);
            if(result){
                console.log("result", result);
            }
        });
    },
    // 'click a.module-internal': function(e) {
    //     e.preventDefault();
    //     var elem = $(e.currentTarget);
    //     var data = elem.data('internalonly');
    //     var url = elem.attr('href');
    //     if(data) {
    //         ClientHelper.internalOnly(function(status){
    //             if(status) {
    //                 // console.log('prohibited', status);
    //                 ClientHelper.notify('warning', 'Sorry, module <strong>'+data+'</strong> is not accessible from outside at this moment.', false);
    //             } else {
    //                 // console.log('allowed', status);
    //                 location.href = url;
    //             }
    //         });
    //     }
    // }
});
