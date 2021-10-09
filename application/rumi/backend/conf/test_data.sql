
-- list location
INSERT INTO `rumi-db2`.`list`
(`category`,
`value`)
VALUES
('location',
'Los Angeles');

INSERT INTO `rumi-db2`.`list`
(`category`,
`value`)
VALUES
('location',
'San Francisco');

INSERT INTO `rumi-db2`.`list`
(`category`,
`value`)
VALUES
('location',
'San Diego');

-- list major
INSERT INTO `rumi-db2`.`list`
(`category`,
`value`)
VALUES
('major',
'Computer Science');

INSERT INTO `rumi-db2`.`list`
(`category`,
`value`)
VALUES
('major',
'English Literature');

INSERT INTO `rumi-db2`.`list`
(`category`,
`value`)
VALUES
('location',
'Finance');

-- user
INSERT INTO `rumi-db2`.`user`
(
`username`,
`password`,
`last_name`,
`first_name`,
`email`,
`birthday`,
`major`,
`activated`)
VALUES
(
'rumi1',
'password',
'rumi',
'rumi',
'rumi1@rumi.com',
current_timestamp(),
4,
1);

INSERT INTO `rumi-db2`.`user`
(
`username`,
`password`,
`last_name`,
`first_name`,
`email`,
`birthday`,
`major`,
`activated`)
VALUES
(
'rumi2',
'password',
'rumi',
'rumi',
'rumi2@rumi.com',
current_timestamp(),
5,
1);

INSERT INTO `rumi-db2`.`user`
(
`username`,
`password`,
`last_name`,
`first_name`,
`email`,
`birthday`,
`major`,
`activated`)
VALUES
(
'rumi3',
'password',
'rumi',
'rumi',
'rumi3@rumi.com',
current_timestamp(),
6,
1);

INSERT INTO `rumi-db2`.`user`
(
`username`,
`password`,
`last_name`,
`first_name`,
`email`,
`birthday`,
`activated`,
`admin`)
VALUES
(
'admin',
'password',
'rumi',
'rumi',
'admin@rumi.com',
current_timestamp(),
1,1);


-- post
INSERT INTO `rumi-db2`.`post`
(
`caption`,
`description`,
`price`,
`location`,
`creator_id`)
VALUES
(
'The Best House in California',
'Near supermarkets',
1000,
1,
1);

INSERT INTO `rumi-db2`.`post`
(
`caption`,
`description`,
`price`,
`location`,
`creator_id`)
VALUES
(
'Great in California',
'SF',
800,
2,
2);

INSERT INTO `rumi-db2`.`post`
(
`caption`,
`description`,
`price`,
`location`,
`creator_id`)
VALUES
(
'Beach House',
'Near beach',
900,
3,
3);