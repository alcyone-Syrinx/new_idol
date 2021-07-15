-- public."TB_CARDS_ABILITY" definition

-- Drop table

-- DROP TABLE "TB_CARDS_ABILITY";

CREATE TABLE "TB_CARDS_ABILITY" (
	card_hash varchar(255) NOT NULL,
	idol_id int4 NOT NULL,
	ability_backmember int4 NOT NULL,
	ability_effect varchar(255) NOT NULL,
	ability_scope int4 NOT NULL,
	ability_strength numeric(10) NOT NULL,
	ability_type int4 NOT NULL,
	db_backmember int4 NOT NULL,
	db_effect varchar(255) NOT NULL,
	db_scope int4 NOT NULL,
	db_strength int4 NOT NULL,
	db_type int4 NOT NULL,
	ability_name varchar(255) NULL,
	CONSTRAINT "TB_CARDS_ABILITY_pkey" PRIMARY KEY (card_hash)
);


-- public."TB_IDOLS" definition

-- Drop table

-- DROP TABLE "TB_IDOLS";

CREATE TABLE "TB_IDOLS" (
	idol_id numeric NOT NULL,
	idol_name varchar(255) NOT NULL,
	idol_age numeric NULL,
	idol_home varchar(255) NULL,
	idol_type numeric NULL,
	CONSTRAINT "TB_IDOLS_pkey" PRIMARY KEY (idol_id),
	CONSTRAINT tb_idols_idol_name_unique UNIQUE (idol_name)
);


-- public."TB_IDOLS_TRANSLATIONS" definition

-- Drop table

-- DROP TABLE "TB_IDOLS_TRANSLATIONS";

CREATE TABLE "TB_IDOLS_TRANSLATIONS" (
	idol_id int4 NOT NULL,
	trans_name varchar(255) NULL,
	CONSTRAINT "TB_IDOLS_TRANSLATIONS_pkey" PRIMARY KEY (idol_id)
);


-- public."TB_MASTER_CODE" definition

-- Drop table

-- DROP TABLE "TB_MASTER_CODE";

CREATE TABLE "TB_MASTER_CODE" (
	category_id int4 NOT NULL DEFAULT nextval('master_code_id'::regclass),
	category varchar(255) NOT NULL,
	category_name varchar(255) NOT NULL,
	cd_v varchar(255) NOT NULL,
	cd_v_meaning varchar(255) NOT NULL,
	cd_v_meaning_trans varchar(255) NULL,
	CONSTRAINT "TB_MASTER_CODE_pkey" PRIMARY KEY (category_id)
);


-- public."TB_IDOLS_CARDS" definition

-- Drop table

-- DROP TABLE "TB_IDOLS_CARDS";

CREATE TABLE "TB_IDOLS_CARDS" (
	card_hash varchar(255) NOT NULL,
	idol_id int4 NOT NULL,
	card_atk int4 NULL,
	card_def int4 NULL,
	card_rare varchar(255) NULL,
	card_name varchar(255) NULL,
	card_seq numeric NULL,
	CONSTRAINT "TB_IDOLS_CARDS_pkey" PRIMARY KEY (card_hash),
	CONSTRAINT tb_idols_cards_idol_id_foreign FOREIGN KEY (idol_id) REFERENCES "TB_IDOLS"(idol_id)
);


-- public."TB_IDOLS_SCRIPTS" definition

-- Drop table

-- DROP TABLE "TB_IDOLS_SCRIPTS";

CREATE TABLE "TB_IDOLS_SCRIPTS" (
	card_hash varchar(255) NOT NULL,
	idol_id int4 NOT NULL,
	script_id int4 NOT NULL,
	card_script varchar(255) NOT NULL,
	trans_script varchar(255) NULL,
	script_category varchar(255) NULL,
	script_group varchar(255) NULL,
	CONSTRAINT card_script_pk PRIMARY KEY (card_script, script_id),
	CONSTRAINT tb_idols_scripts_idol_id_foreign FOREIGN KEY (idol_id) REFERENCES "TB_IDOLS"(idol_id)
);