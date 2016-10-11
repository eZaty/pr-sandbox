Meteor.publish('allEmployees', function (){
    return Employees.find();
});


Meteor.methods({
    addEmployee: function(params) {
        return Employees.insert(params);
    }
});
