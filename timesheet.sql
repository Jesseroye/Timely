

create database Timesheet;
use Timesheet;

/* clean up old tables;
   must drop tables with foreign keys first
   due to referential integrity constraints
 */
drop table IF EXISTS Time_entries;
drop table IF EXISTS Employee_timesheet;
drop table IF EXISTS Employee_info;
drop table IF EXISTS Manager_info;
drop table IF EXISTS Client_info;
drop table IF EXISTS Jobs_info;
drop table IF EXISTS Client_pool;


create table Manager_info
   (manager_id 	    varchar(50)	not null unique,
    first_name 		varchar(15)	not null,
    last_name 		varchar(15)	not null,
    primary key(manager_id));
    
create table Employee_info
   (employee_id 	varchar(50)	not null unique,
    manager_id		varchar(50)	not null,
    first_name 		varchar(15)	not null,
    last_name 		varchar(15)	not null,
    email           varchar(25) not null,
    address         varchar(50) not null,
    password        varchar(250) not null,
    primary key(employee_id),
    foreign key(manager_id) references Manager_info(manager_id) on update cascade on delete cascade );
    
create table Client_info
   (client_id 	        varchar(50)	not null unique,
    manager_name       	varchar(50)	not null,
    first_name          varchar(50)	not null,
    last_name          varchar(50)	not null,
    primary key(client_id));

create table Employee_timesheet
   (task_id 	    varchar(50)	not null unique,
    employee_id 	varchar(50)	not null,
    title 	        varchar(50)	not null,
    client_name 	varchar(50)	not null,
    client_id       varchar(50) not null,
    total_time      varchar(15) not null,
    primary key(task_id),
    foreign key(employee_id) references Employee_info(employee_id) on update cascade on delete cascade,
    foreign key(client_id) references Client_info(client_id) on update cascade on delete cascade );
    
create table Jobs_info
   (job_id 	            varchar(50)	not null unique,
    client_id       	varchar(50)	not null,
    employee_id         varchar(50)	not null,
    primary key(job_id),
    foreign key(client_id) references Client_info(client_id) on update cascade on delete cascade,
    foreign key(employee_id) references Employee_info(employee_id) on update cascade on delete cascade);
    
create table Client_pool
    (client_id       	varchar(50)	not null,
     employee_id        varchar(50) not null);
    
create table Time_entries
   (time_id 	        varchar(50)	not null unique,
    task_id         	varchar(50)	not null,
    start_time          varchar(15) not null,
    end_time            varchar(15) not null,
    primary key(time_id),
    foreign key(task_id) references Employee_timesheet(task_id) on update cascade on delete cascade);
    
DELIMITER //

DROP PROCEDURE IF EXISTS authcode; //
CREATE PROCEDURE authcode()
BEGIN
SELECTED manager_id FROM Manager_id;
END; //


INSERT INTO Manager_info VALUES ('123123','Michelle','Sean');
INSERT INTO Manager_info VALUES ('321321','Kendrick','Jhene');
INSERT INTO Manager_info VALUES ('222111','Lamar','Aiko');
INSERT INTO Manager_info VALUES ('333111','Joe','Budden');

INSERT INTO Employee_info VALUES ('667755','123123','Jesse','Roye','jesse@email.com','20 Halart Drive','$2b$10$twC0zRj4wLlOxODvifojw.pUE0fzAvVJntfiXQLIYQaTt.uKUcYl2');
/*password is class*/
INSERT INTO Employee_info VALUES 
('553344','321321','Rashid','Issahid','rashid@email.com','18 Halart Drive','$2b$10$SeAcqTCU3CZLWUXw7H7PgermnaUNk4F.z7FNXwXa8tSjnjKUQajJ.');
/*password is pass*/
INSERT INTO Employee_info VALUES ('775533','321321','Nicki','Barbie','nicki@email.com','21 Halart Drive','$2b$10$MHF9GkIRDdhPE9SLmcWh2ukFfdAYTKMdyT44R/W3iTZpNy6aDyp2q');
/*password is word*/


INSERT INTO Client_info VALUES ('111111','Michelle','Richard','Lance');
INSERT INTO Client_info VALUES ('222222','Kendrick','Marcia','Larwance');
INSERT INTO Client_info VALUES ('333333','Michelle','Paul','Wilson');

INSERT INTO Employee_timesheet VALUES ('211111','667755','Programming','Richard','111111','9:30PM');
INSERT INTO Employee_timesheet VALUES ('311111','667755','Wall Repair','Wilson','333333','11:30PM');
INSERT INTO Employee_timesheet VALUES ('411111','553344','Sink Replacement','Kendrick','222222','2:30PM');
INSERT INTO Employee_timesheet VALUES ('511111','553344','Monitor Replacement','Kendrick','222222','3:30PM');


INSERT INTO Jobs_info VALUES ('144444','111111','667755');
INSERT INTO Jobs_info VALUES ('155555','222222','553344');
INSERT INTO Jobs_info VALUES ('166666','111111','667755');


INSERT INTO Client_pool VALUES ('111111','667755');
INSERT INTO Client_pool VALUES ('111111','667755');
INSERT INTO Client_pool VALUES ('222222','553344');
INSERT INTO Client_pool VALUES ('222222','667755');


INSERT INTO Time_entries VALUES ('011111','211111','5:30AM','9:30PM');
INSERT INTO Time_entries VALUES ('511111','222222','9:30PM','11:30PM');
INSERT INTO Time_entries VALUES ('911111','333333','10:30AM','1:30PM');
INSERT INTO Time_entries VALUES ('811111','333333','4:30AM','9:30AM');


    
    
    
