-- name your database "journey_tellr"

CREATE TABLE "person" (
	"id" serial NOT NULL,
	"email" varchar(40) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	"first_name" varchar(40) NOT NULL,
	"last_name" varchar(40) NOT NULL,
	"profile_pic" TEXT,
	"date_created" DATE NOT NULL DEFAULT now(),
	CONSTRAINT person_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "story" (
	"id" serial NOT NULL,
	"header_photo" varchar(240) NOT NULL,
	"author" integer NOT NULL,
	"title" varchar(80) NOT NULL UNIQUE,
	"caption" varchar(280),
	"intro" TEXT NOT NULL,
	"date_started" DATE NOT NULL DEFAULT now(),
	"completed" BOOLEAN NOT NULL DEFAULT 'false',
	"last_edit" timestamp,
	"is_template" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT story_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "chapter" (
	"id" serial NOT NULL,
	"story_id" integer,
	"title" varchar(80) NOT NULL,
	"text" TEXT,
	"date_created" timestamp,
	"order" integer NOT NULL,
	CONSTRAINT chapter_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "team" (
	"id" serial NOT NULL,
	"name" varchar(80) NOT NULL UNIQUE,
	"date_created" timestamp NOT NULL DEFAULT now(),
	CONSTRAINT team_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "contributor" (
	"id" serial NOT NULL,
	"person_id" integer NOT NULL,
	"story_id" integer NOT NULL,
	"status" varchar(10) NOT NULL,
	CONSTRAINT contributor_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "photo" (
	"id" serial NOT NULL,
	"person_id" integer NOT NULL,
	"photo" varchar(1000) UNIQUE,
	"shareable" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT photo_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "story_likes" (
	"id" serial NOT NULL,
	"person_id" integer NOT NULL,
	"story_id" integer NOT NULL,
	CONSTRAINT story_likes_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "photo_caption" (
	"id" serial NOT NULL,
	"caption" varchar(280),
	"chapter_id" integer NOT NULL,
	"photo_id" integer NOT NULL,
	"created_on" timestamp NOT NULL DEFAULT now(),
	CONSTRAINT photo_caption_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "template_story" (
	"id" serial NOT NULL,
	"creator" integer NOT NULL,
	"name" varchar(280) NOT NULL UNIQUE,
	"title" varchar(280) NOT NULL,
	"caption" varchar(280) NOT NULL UNIQUE,
	"placeholder_image" VARCHAR(280) NOT NULL,
	"intro" TEXT NOT NULL,
	"date_created" timestamp NOT NULL DEFAULT now(),
	CONSTRAINT template_story_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "team_person" (
	"id" serial NOT NULL,
	"team_id" integer NOT NULL,
	"person_id" integer NOT NULL,
	"status" varchar(10) NOT NULL,
	CONSTRAINT team_person_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "template_chapter" (
	"id" serial NOT NULL,
	"template_id" integer NOT NULL,
	"title" varchar(240) NOT NULL,
	"text" TEXT NOT NULL,
	"date_created" DATE NOT NULL DEFAULT now(),
	"order" integer NOT NULL,
	CONSTRAINT template_chapter_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "story" ADD CONSTRAINT "story_fk1" FOREIGN KEY ("author") REFERENCES "person"("id");

ALTER TABLE "chapter" ADD CONSTRAINT "chapter_fk0" FOREIGN KEY ("story_id") REFERENCES "story"("id");


ALTER TABLE "contributor" ADD CONSTRAINT "contributor_fk0" FOREIGN KEY ("person_id") REFERENCES "person"("id");
ALTER TABLE "contributor" ADD CONSTRAINT "contributor_fk1" FOREIGN KEY ("story_id") REFERENCES "story"("id");

ALTER TABLE "photo" ADD CONSTRAINT "photo_fk0" FOREIGN KEY ("person_id") REFERENCES "person"("id");

ALTER TABLE "story_likes" ADD CONSTRAINT "story_likes_fk0" FOREIGN KEY ("person_id") REFERENCES "person"("id");
ALTER TABLE "story_likes" ADD CONSTRAINT "story_likes_fk1" FOREIGN KEY ("story_id") REFERENCES "story"("id");

ALTER TABLE "photo_caption" ADD CONSTRAINT "photo_caption_fk0" FOREIGN KEY ("chapter_id") REFERENCES "chapter"("id");
ALTER TABLE "photo_caption" ADD CONSTRAINT "photo_caption_fk1" FOREIGN KEY ("photo_id") REFERENCES "photo"("id");

ALTER TABLE "template_story" ADD CONSTRAINT "template_story_fk0" FOREIGN KEY ("creator") REFERENCES "person"("id");

ALTER TABLE "team_person" ADD CONSTRAINT "team_person_fk0" FOREIGN KEY ("team_id") REFERENCES "team"("id");
ALTER TABLE "team_person" ADD CONSTRAINT "team_person_fk1" FOREIGN KEY ("person_id") REFERENCES "person"("id");

ALTER TABLE "template_chapter" ADD CONSTRAINT "template_chapter_fk0" FOREIGN KEY ("template_id") REFERENCES "template_story"("id");

-- dummy data for templates

INSERT INTO person ("id", "email", "password", "first_name", "last_name", "profile_pic" )
	VALUES (999999, 'test@test.com', 'saltAndHash', 'Testee', 'McGee', '/images/placeholder.png');

INSERT INTO template_story ("id", "creator", "name", "title", "caption", "placeholder_image", "intro")
	VALUES (100, 999999, 'Your First Day', 'Your Name First Day', 'A sentence about you and a blurb', '/images/placeholder.png', 'Write about one thing you are looking forward to with this role and one challenge'),
	(200, 999999, 'Holiday/Social Event', 'Event Name', 'A sentence about the reason for the event', '/images/placeholder.png', 'Who, what, where, when, and why'),
	(300, 999999, 'Team Meeting', 'Your Team/Dept Name and Project', 'Biggest accomplishment', '/images/placeholder.png', 'Write about your main purpose and memorable moment');

INSERT INTO template_chapter ("template_id", "title", "text", "order")
    VALUES (100, 'Title related to your personal history', 'Share about your strengths, interests, and passions to help others get to know you.', 1),
    (100, 'Add Your Team Name Introductions', 'Take a picture with the team or a member and share about a conversation you had with them', 2),
    (100, 'Your First Accomplishment', 'Share about how you overcame a challenge using resources, skills, and/or a coworker.', 3),
    (100, 'Reflection and Onward', 'Share about something that would have helped you to learn sooner and something you are looking forward to.', 4);