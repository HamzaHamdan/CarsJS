delete from carmakes;
delete from carmodels;
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
        from carmakes
        where make = "BMW"), "330i");
insert into carModels
    (makeId, model)
values
    ((select id
        from carmakes
        where make = "BMW"), "328i");
insert into carModels
    (makeId, model)
values
    ((select id
        from carmakes
        where make = "BMW"), "528i");
insert into carModels
    (makeId, model)
values
    ((select id
        from carmakes
        where make = "Honda"), "Accord");
insert into carModels
    (makeId, model)
values
    ((select id
        from carmakes
        where make = "Honda"), "Civic");
insert into carModels
    (makeId, model)
values
    ((select id
        from carmakes
        where make = "Honda"), "Fit");
        insert into carModels
    (makeId, model)
values
    ((select id
        from carmakes
        where make = "Audi"), "Q5");
insert into carModels
    (makeId, model)
values
    ((select id
        from carmakes
        where make = "Audi"), "A3");
insert into carModels
    (makeId, model)
values
    ((select id
        from carmakes
        where make = "Audi"), "A6");
insert into carModels
    (makeId, model)
values
    ((select id
        from carmakes
        where make = "Mercedes"), "AMG GT");
insert into carModels
    (makeId, model)
values
    ((select id
        from carmakes
        where make = "Mercedes"), "Benz S-Class");
insert into carModels
    (makeId, model)
values
    ((select id
        from carmakes
        where make = "Mercedes"), "Benz G-Class");


--Added models.--

SELECT * FROM cars_db.carmodels;
select * from carmodels;

delete from carmodels where id in (5,6);
commit;
insert into carmodels(makeid,model)
values ((select id from carmakes where make="Audi"),'Q5');

insert into carmodels(makeid,model)
values ((select id from carmakes where make="Audi"),'A3');

insert into carmodels(makeid,model)
values ((select id from carmakes where make="Honda"),'Accord');

insert into carmodels(makeid,model)
values ((select id from carmakes where make="Honda"),'Civic');

insert into carmodels(makeid,model)
values ((select id from carmakes where make="Honda"),'Fit');

insert into carmodels(makeid,model)
values ((select id from carmakes where make="Mercedes"),'Benz S-Class');

insert into carmodels(makeid,model)
values ((select id from carmakes where make="Mercedes"),'Benz G-Class');

insert into carmodels(makeid,model)
values ((select id from carmakes where make="Mercedes"),'AMG GT');







select * from carmodels;
DELETE FROM CARMAKES WHERE ID > 5;
COMMIT;




