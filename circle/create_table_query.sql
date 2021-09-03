CREATE TABLE calls (
	sr_no VARCHAR NOT NULL,
	sr_type VARCHAR NOT NULL,
	sr_method TEXT,
	sr_status TEXT,
	sr_change TIMESTAMP,
	sr_created TIMESTAMP,
	sr_update TIMESTAMP,
	sr_close TIMESTAMP,
	sr_location TEXT,
	st_number VARCHAR,
	st_name TEXT,
	city TEXT,
	zip_code VARCHAR(5),
	county TEXT,
	state_x VARCHAR,
	state_y VARCHAR,
	lat VARCHAR,
	long VARCHAR,
	lat_long POINT,
	district INT,
	map_pg VARCHAR,
	map_tile VARCHAR);
	
SELECT COUNT(sr_no) FROM 
	calls
WHERE 
	(zip_code = '78704');