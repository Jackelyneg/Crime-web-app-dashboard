from flask import Flask, render_template, jsonify
import pandas as pd
from sqlalchemy import create_engine
import numpy as np
import json
app = Flask(__name__)
engine = create_engine(
    'postgresql://postgres:samridhi@localhost:5432/crime_state')
@app.route("/")
def home():
    return render_template("index.html")
@app.route("/dropdowncrimetypes")
def crimes():
    offense_type = pd.read_sql("""SELECT offense
    FROM all_crime
    GROUP BY offense
    ORDER BY offense;""", engine)
    offense_list=offense_type.offense.to_list()
    return jsonify(offense_list)
@app.route("/dropdownstatetypes")
def crimes_state():
    state_type=pd.read_sql("""SELECT state
    FROM state_table
    GROUP BY state
    ORDER BY state;""",engine)
    state_list=state_type.state.to_list()
    print(state_list)
    return jsonify(state_list) 
@app.route("/dropdownyeartypes")
def year_state():  
    year_df=pd.read_sql("""SELECT year
    FROM all_crime
    GROUP BY year
    ORDER BY year;""",engine)   
    year_list=year_df.year.to_list()   
    return jsonify(year_list)
@app.route("/demographicdata/<crime>/<state>/<newyear>")
def demo_state(crime,state,newyear):
    demo_type=pd.read_sql(f"""select demographics.population, demographics.year , demographics.officer_count,all_crime.state_abbr,all_crime.state,all_crime.crime_reported, all_crime.offense
    from all_crime
    left join demographics
    on all_crime.state_abbr = demographics.state_abbr
    AND all_crime.year=demographics.year
    where all_crime.offense = '{crime}'
    AND all_crime.state='{state}'
    AND all_crime.year = {newyear};""",engine)
    bubble_list = demo_type.to_dict(orient = "records")
    return jsonify(bubble_list)