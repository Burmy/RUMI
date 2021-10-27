-- user
INSERT INTO `rumi-db2`.`user`
(
`username`,
`password`,
`email`,
`description`,
`gender`,
`school`,
`major`,
`smoker`,
`pets`,
`activated`,
`deleted`)
VALUES
(
'rumi1',
'password',
'rumi1@rumi.com',
'I am normal user',
'F',
'SFSU',
30,
1,
1,
1,
0);

INSERT INTO `rumi-db2`.`user`
(
`username`,
`password`,
`email`,
`description`,
`gender`,
`school`,
`major`,
`smoker`,
`pets`,
`activated`,
`deleted`)
VALUES
(
'rumi2',
'password',
'rumi2@rumi.com',
'I am normal user',
'M',
'SFSU',
31,
0,
1,
1,
0);

INSERT INTO `rumi-db2`.`user`
(
`username`,
`password`,
`email`,
`birthday`,
`activated`,
`admin`,
`deleted`)
VALUES
(
'admin',
'password',
'admin@rumi.com',
current_timestamp(),
1,1,0);


-- post
INSERT INTO `rumi-db2`.`post`
(
`caption`,
`description`,
`price`,
`location`,
`photo`,
`thumbnail`,
`parking`,
`pet`,
`smoking`,
`gender`,
`creator_id`,
`deleted`)
VALUES
(
'The Best House in California',
'Near supermarkets',
1000,
1,
'image1.jpeg',
'thumbnail-image1.jpeg',
0,
1,
1,
'N',
2,
0);

INSERT INTO `rumi-db2`.`post`
(
`caption`,
`description`,
`price`,
`location`,
`photo`,
`thumbnail`,
`parking`,
`pet`,
`smoking`,
`gender`,
`creator_id`,
`deleted`)
VALUES
(
'Great in California',
'SF',
800,
2,
'image3.jpeg',
'thumbnail-image3.jpeg',
1,
0,
1,
'F',
1,
0);

INSERT INTO `rumi-db2`.`post`
(
`caption`,
`description`,
`price`,
`location`,
`photo`,
`thumbnail`,
`parking`,
`pet`,
`smoking`,
`gender`,
`creator_id`,
`deleted`)
VALUES
(
'Beach House',
'Near beach',
900,
3,
'image2.jpeg',
'thumbnail-image2.jpeg',
1,
1,
0,
'M',
2,
0);