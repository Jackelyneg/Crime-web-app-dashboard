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
    GROUP BY offense;""", engine)
    offense_list=offense_type.offense.to_list()
    return jsonify(offense_list)
@app.route("/dropdownstatetypes")
def crimes_state():
    state_type=pd.read_sql("""SELECT state
    FROM state_table
    GROUP BY state;""",engine)
    state_list=state_type.state.to_list()
    print(state_list)
    return jsonify(state_list) 
@app.route("/dropdownyeartypes")
def year_state():  
    year_df=state_type=pd.read_sql("""SELECT year
    FROM all_crime
    GROUP BY year;""",engine)   
    year_list=year_df.year.to_list()   
    return jsonify(year_list)
@app.route("/sunburst_chart/<query_year>")    
def sunburst_map(query_year):
    sunbur_type=pd.read_sql(f"""SELECT year,state_abbr,offense,crime_reported
    FROM all_crime
    where year={query_year}
    ;""",engine)  
    tot_state_crime=pd.read_sql("""SELECT state_abbr,sum(crime_reported) as tot_state_crime
    FROM all_crime
    group by state_abbr
    ;""",engine)
    tot_year_df=pd.read_sql("""SELECT sum(crime_reported) as tot_year_crime
    FROM all_crime
    ;""",engine)
    state_list=(sunbur_type["state_abbr"].unique()).tolist()
    sunbur=pd.merge(sunbur_type,tot_state_crime,on ="state_abbr",how="inner")
    tot_year_crime=tot_year_df["tot_year_crime"].values[0]
    sunbur["tot_year_crime"]=tot_year_crime
    sunbur=sunbur[["year","tot_year_crime","state_abbr","tot_state_crime","offense","crime_reported"]]
    year_json={}
    year_json = {"name" :f'{query_year}',"value" :f' {tot_year_crime}',"children":[]}
    for state in state_list:
        filter_df=sunbur.loc[sunbur["state_abbr"]==state]
        dict_child_state={"name":f'{state}',"id":f'{state}',"value":f'{filter_df["tot_state_crime"].values[0]}',"children":[]}
        for index, row in filter_df.iterrows():
            dict_child_offense={"name":f'{row["offense"]}',"value":f'{row["crime_reported"]}'}
            dict_child_state["children"].append(dict_child_offense)
        year_json["children"].append(dict_child_state)
    # year_json=(f'[{year_json}]')
    # print(year_json)
    p=str(year_json).replace("'" ,'"' )
    # print(p)
    a_list = []
# dictionary_copy = year_json.copy()
    a_list.append(p)
    # print(a_list)
    k=str(a_list).replace("'" ,'' )
    print(k)
    # with open('test.json', 'w') as fout:
    #     json.dump(a_list , fout)
    return (k)
# @app.route("/demographicdata/<crime>/<state>/<query_year>")
# def demo_state(crime,state,query_year):
#     demo_type=pd.read_sql(f"""SELECT DISTINCT a.year, a.crime_reported, a.state_abbr, a.offense, d.officer_count, d.population
#         FROM all_crime as a
#         LEFT JOIN demographics as d
#         ON a.year = d.year AND a.state_abbr = d.state_abbr
#         AND a.offense = '{crime}' 
#         AND a.state_abbr = '{state}'
#         WHERE a.year = {query_year};""",engine)
#     demo_list = demo_type.to_dict(orient = "records")
#     return jsonify(demo_list) 
@app.route("/demographicdata/<crime>/<state>/<query_year>")
def demo_state(crime,state,query_year):
    demo_type=pd.read_sql(f"""select demographics.population, demographics.year , demographics.officer_count,all_crime.state_abbr,all_crime.state,all_crime.crime_reported, all_crime.offense
    from all_crime
    inner join demographics
    on all_crime.state_abbr = demographics.state_abbr
    where all_crime.offense = '{crime}'
    AND all_crime.state='{state}'
    AND all_crime.year = {query_year};""",engine)
    bubble_list = demo_type.to_dict(orient = "records")
    return jsonify(bubble_list)  
if __name__ == "__main__":
    app.run(debug=True)