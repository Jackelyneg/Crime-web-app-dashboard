--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

-- Started on 2021-08-04 13:47:39

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 201 (class 1259 OID 19132)
-- Name: all_crime; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.all_crime (
    id integer NOT NULL,
    year integer NOT NULL,
    state_abbr character varying(4) NOT NULL,
    offense character varying(20) NOT NULL,
    crime_reported character varying(20) NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    state character varying(20) NOT NULL
);


ALTER TABLE public.all_crime OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 19345)
-- Name: demographics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.demographics (
    id integer NOT NULL,
    population double precision,
    state_abbr character varying,
    year integer,
    income double precision,
    education double precision,
    officer_count double precision,
    officer_percent double precision
);


ALTER TABLE public.demographics OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 19142)
-- Name: race; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.race (
    id integer NOT NULL,
    state_abbr character varying(4) NOT NULL,
    black double precision NOT NULL,
    white double precision NOT NULL,
    asian double precision NOT NULL,
    hispanics double precision NOT NULL,
    year integer NOT NULL
);


ALTER TABLE public.race OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 19127)
-- Name: state_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.state_table (
    id integer NOT NULL,
    state_abbr character varying(4) NOT NULL,
    state character varying(20) NOT NULL
);


ALTER TABLE public.state_table OWNER TO postgres;

--
-- TOC entry 2868 (class 2606 OID 19358)
-- Name: demographics demographics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.demographics
    ADD CONSTRAINT demographics_pkey PRIMARY KEY (id);


--
-- TOC entry 2864 (class 2606 OID 19136)
-- Name: all_crime pk_all_crime; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.all_crime
    ADD CONSTRAINT pk_all_crime PRIMARY KEY (id);


--
-- TOC entry 2866 (class 2606 OID 19146)
-- Name: race pk_race; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.race
    ADD CONSTRAINT pk_race PRIMARY KEY (id);


--
-- TOC entry 2862 (class 2606 OID 19131)
-- Name: state_table pk_state_table; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.state_table
    ADD CONSTRAINT pk_state_table PRIMARY KEY (state_abbr);


--
-- TOC entry 2869 (class 2606 OID 19147)
-- Name: all_crime fk_all_crime_state_abbr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.all_crime
    ADD CONSTRAINT fk_all_crime_state_abbr FOREIGN KEY (state_abbr) REFERENCES public.state_table(state_abbr);


--
-- TOC entry 2870 (class 2606 OID 19157)
-- Name: race fk_race_state_abbr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.race
    ADD CONSTRAINT fk_race_state_abbr FOREIGN KEY (state_abbr) REFERENCES public.state_table(state_abbr);


-- Completed on 2021-08-04 13:47:40

--
-- PostgreSQL database dump complete
--

