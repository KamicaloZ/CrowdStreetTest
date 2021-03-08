#Welcome to my SQL Skills Answer Sheet!

## Setup
Perform the following commands to make sure your system is up-to-date, and has the necessary libraries installed for the rest of this to work:

`$ sudo apt update`

`$ sudo apt install postgresql postgresql-contrib`

After that, you will want to make a new database that I will help you populate:

`$ sudo -u postgres createdb csdb`

To access this new db, use:

`$ sudo -u postgres psql csdb`



##Data Creation
Paste the following into your newly created and accessed csdb DATABASE: 
```
CREATE TABLE people (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL
);
INSERT INTO
	people(name)
VALUES('John'), ('Mary'), ('Chen');



CREATE TABLE vehicle (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL
);
INSERT INTO 
	vehicle(name)
VALUES('Truck'), ('Car'), ('Bike');



CREATE TABLE pet (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL
);
INSERT INTO
	pet(name)
VALUES('Dog'), ('Cat'), ('Parrot');



CREATE TABLE people_vehicle (
	id SERIAL PRIMARY KEY,
	people_id int NOT NULL,
	vehicle_id int NOT NULL,
	FOREIGN KEY (people_id) REFERENCES people(id),
	FOREIGN KEY (vehicle_id) REFERENCES vehicle(id)
);
INSERT INTO
	people_vehicle(people_id, vehicle_id)
VALUES(2, 1), (1, 2), (1, 2), (1, 1), (1, 1);




CREATE TABLE people_pet (
	id SERIAL PRIMARY KEY,
	people_id int NOT NULL,
	pet_id int NOT NULL,
	FOREIGN KEY (people_id) REFERENCES people(id),
	FOREIGN KEY (pet_id) REFERENCES pet(id)
);
INSERT INTO
	people_pet(people_id, pet_id)
VALUES(1, 1), (3, 3), (3, 2);
```
***************

After copying that over, perform the following commands to see their respective answers:

##SQL Skills - Part 1
#A
This is showing the result of having the table people_vehicle made, in that the two other tables can be successfully joined together to show the appropriate data.
 
`select p.id as people_id, p.name as people_name, v.id as vehicle_id, v.name as vehicle_name from people as p left join people_vehicle as pv on pv.people_id = p.id left join vehicle as v on v.id = pv.vehicle_id order by people_id asc;`

####Results:
```
 people_id | people_name | vehicle_id | vehicle_name 
-----------+-------------+------------+--------------
         1 | John        |          2 | Car
         1 | John        |          2 | Car
         1 | John        |          1 | Truck
         1 | John        |          1 | Truck
         2 | Mary        |          1 | Truck
         3 | Chen        |            | 
(6 rows)
```

#B
This is showing the result of having the table people_pet made, in that the two other tables can be successfully joined together to show the appropriate data.

`select p.id as people_id, p.name as people_name, pet.id as pet_id, pet.name as pet_name from people as p left join people_pet as pp on pp.people_id = p.id left join pet on pet.id = pp.pet_id order by people_id asc;`

###Results:
```
.id = pp.pet_id order by people_id asc;
 people_id | people_name | pet_id | pet_name 
-----------+-------------+--------+----------
         1 | John        |      1 | Dog
         2 | Mary        |        | 
         3 | Chen        |      3 | Parrot
         3 | Chen        |      2 | Cat
(4 rows)
```

##SQL Skills - Part 2

#D

#####NOTE:  I was able to figure out the query in that I return the people asked for, but don't list the number of each to show they qualify.  The script I used to find them is below:
```
select foobar.name from (select foo.name as name, total from (select count(name) as total, name from (select p.name as name, pet.name as pet from people as p inner join people_pet as pp on pp.people_id = p.id inner join pet on pet.id = pp.pet_id) as foo group by name) as foo
UNION ALL
select bar.name as name, total from (select count(name) as total, name from (select p.name as name, v.name as vehicle from people as p inner join people_vehicle as pv on pv.people_id = p.id inner join vehicle as v on v.id = pv.vehicle_id) as foo group by name) as bar
) as foobar where total > 1;
```

###Results:
```
 name 
------
 Chen
 John
(2 rows)
```

#C

#####NOTE:  I am putting C last because I couldn't figure it out.  I tried everything I could to get the exact format, and even started to venture into using psycopg2 on python to force the output, but realized that was probably against the nature of the challenge, so I stopped.  Instead, I have a query that has the data being looked for to query on for the data wanted.  


`select p.name as name, v.name as vehicles, pet.name as pets from people as p left join people_vehicle as pv on p.id = pv.people_id left join vehicle as v on v.id = pv.vehicle_id left join people_pet as pp on pp.people_id = p.id left join pet on pet.id = pp.pet_id order by p.id asc;`

###Results:
```
 name | vehicles |  pets  
------+----------+--------
 John | Car      | Dog
 John | Car      | Dog
 John | Truck    | Dog
 John | Truck    | Dog
 Mary | Truck    | 
 Chen |          | Parrot
 Chen |          | Cat
(7 rows)
```

#####EXTRA NOTE: I also tried to use a REFCURSOR procedure to see if I could do things like that, but realized late that the version of Postgresql may not precisely support the commands I was using, and ran out of the time I allotted myself to doing these exercises.  So below are the final-most SQL query I could manage to get the data in its raw state, and as far as I got into the REFCUSOR procedure before I had to stop.

```
CREATE OR REPLACE PROCEDURE p_by_name (
  p_name p.name%TYPE,
  p_refcur REFCURSOR,
  p_id p.id%TYPE
) RETURNS REFCURSOR AS $$
BEGIN
  OPEN p_refcur FOR SELECT p.id, p.name from people as p;
  DBMS_OUTPUT.PUT_LINE('pid     pname');
  DBMS_OUTPUT.PUT_LINE('---     -----');
  LOOP
    FETCH p_refcur INTO p_id, p_name;
    EXIT WHEN p_refcur%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE(p_id || '	' || p_name);
  END LOOP;
  CLOSE p_refcur;
  RETURN p_refcur
END;
$$ LANGUAGE plpgsql;
```