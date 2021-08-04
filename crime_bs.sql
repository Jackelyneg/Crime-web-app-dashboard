drop table "state_table";
CREATE TABLE "state_table" (
    "id" int   NOT NULL,
    "state_abbr" varchar(20)   NOT NULL,
    "state" varchar(20)   NOT NULL,
    CONSTRAINT "pk_state_table" PRIMARY KEY (
        "state_abbr"
     )
);
drop table "all_crime";
CREATE TABLE "all_crime" (
    "id" int   NOT NULL,
    "year" int   NOT NULL,
    "state_abbr" varchar(4)   NOT NULL,
    "offense" varchar(20)   NOT NULL,
    "crime_reported" varchar(20)   NOT NULL,
    "latitude" float   NOT NULL,
    "longitude" float   NOT NULL,
    "state" varchar(20)   NOT NULL,
    CONSTRAINT "pk_all_crime" PRIMARY KEY (
        "id"
     )
);
drop table "demographics";
CREATE TABLE "demographics" (
    "id" int   NOT NULL,
    "population" float   NOT NULL,
    "state" varchar(4)   NOT NULL,
    "year" int   NOT NULL,
    "income" float   NOT NULL,
    "education" float   NOT NULL,
    "officer_count" float   NOT NULL,
    "officer_percent" float   NOT NULL,
    CONSTRAINT "pk_demographics" PRIMARY KEY (
        "id"
     )
);
drop table "race";
CREATE TABLE "race" (
    "id" int   NOT NULL,
    "state_abbr" varchar(4)   NOT NULL,
    "black" float   NOT NULL,
    "white" float   NOT NULL,
    "asian" float   NOT NULL,
    "hispanics" float   NOT NULL,
    "year" int   NOT NULL,
    CONSTRAINT "pk_race" PRIMARY KEY (
        "id"
     )
);
ALTER TABLE "all_crime" ADD CONSTRAINT "fk_all_crime_state_abbr" FOREIGN KEY("state_abbr")
REFERENCES "state_table" ("state_abbr");
ALTER TABLE "demographics" ADD CONSTRAINT "fk_demographics_state" FOREIGN KEY("state")
REFERENCES "state_table" ("state_abbr");
ALTER TABLE "race" ADD CONSTRAINT "fk_race_state_abbr" FOREIGN KEY("state_abbr")
REFERENCES "state_table" ("state_abbr");
QuickDBDQuickDBD
Home - QuickDBD
Quick Database Diagrams (QuickDBD) is a simple online tool to quickly draw database diagrams by typing.
white_check_mark
eyes
raised_hands

SELECT * FROM race;


SELECT * FROM state_table;


Send a message to Andy Jagdeo


















