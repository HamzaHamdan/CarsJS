
insert into carMakes
    (make)
values
    ("All makes");
insert into carMakes
    (make)
values
    ("BMW");
insert into carMakes
    (make)
values
    ("Honda");
insert into carMakes
    (make)
values
    ("Audi");
insert into carMakes
    (make)
values
    ("Mercedes");
insert into carModels
    (makeId, model)
values
    ((select id
        from carMakes
        where make = "BMW"), "330i");
insert into carModels
    (makeId, model)
values
    ((select id
        from carMakes
        where make = "BMW"), "328i");
insert into carModels
    (makeId, model)
values
    ((select id
        from carMakes
        where make = "BMW"), "528i");
insert into carModels
    (makeId, model)
values
    ((select id
        from carMakes
        where make = "Honda"), "Accord");
insert into carModels
    (makeId, model)
values
    ((select id
        from carMakes
        where make = "Honda"), "Civic");
insert into carModels
    (makeId, model)
values
    ((select id
        from carMakes
        where make = "Honda"), "Fit");
        insert into carModels
    (makeId, model)
values
    ((select id
        from carMakes
        where make = "Audi"), "Q5");
insert into carModels
    (makeId, model)
values
    ((select id
        from carMakes
        where make = "Audi"), "A3");
insert into carModels
    (makeId, model)
values
    ((select id
        from carMakes
        where make = "Audi"), "A6");
insert into carModels
    (makeId, model)
values
    ((select id
        from carMakes
        where make = "Mercedes"), "AMG GT");
insert into carModels
    (makeId, model)
values
    ((select id
        from carMakes
        where make = "Mercedes"), "Benz S-Class");
insert into carModels
    (makeId, model)
values
    ((select id
        from carMakes
        where make = "Mercedes"), "Benz G-Class");

insert into carModels(makeid,model)
values ((select id from carMakes where make="Audi"),'Q5');

insert into carModels(makeid,model)
values ((select id from carMakes where make="Audi"),'A3');

insert into carModels(makeid,model)
values ((select id from carMakes where make="Honda"),'Accord');

insert into carModels(makeid,model)
values ((select id from carMakes where make="Honda"),'Civic');

insert into carModels(makeid,model)
values ((select id from carMakes where make="Honda"),'Fit');

insert into carModels(makeid,model)
values ((select id from carMakes where make="Mercedes"),'Benz S-Class');

insert into carModels(makeid,model)
values ((select id from carMakes where make="Mercedes"),'Benz G-Class');

insert into carModels(makeid,model)
values ((select id from carMakes where make="Mercedes"),'AMG GT');

