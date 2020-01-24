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


