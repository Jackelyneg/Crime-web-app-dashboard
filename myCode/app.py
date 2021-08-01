from flask import Flask, render_template, jsonify
import pandas as pd
from sqlalchemy import create_engine

app = Flask(__name__)
engine = create_engine(
    'postgresql://postgres:mlgmj5@localhost:5432/crime')


@app.route("/")
def home():
    return render_template("index.html")


# @app.route("/years")
# def years():
#     years_type = pd.read_sql("""SELECT DISTINCT year
#     FROM demographics
#     ORDER BY year;""", engine)
#     yearsList = years_type.year.to_list()
#     return jsonify(yearsList)


@app.route("/dropdownstates")
def states():
    state_type = pd.read_sql("""SELECT state
    FROM state_table
    ORDER BY state;""", engine)
    stateList = state_type.state.to_list()
    return jsonify(stateList)

@app.route("/state_data/<state>")
def state(state):   
    state_data_type = pd.read_sql(f"""SELECT s.state_abbr, d.year, sum(d.population) as Population, 
    sum(d.officer_count) as Officer_Count, sum(d.education) as Degree_Holders, sum(d.income) as Average_Income
    FROM state_table as s
    LEFT JOIN demographics as d ON s.state_abbr = d.state_abbr
    WHERE s.state LIKE '{state}'
    GROUP BY s.state_abbr, d.year
    ORDER BY s.state_abbr, d.year;""",engine)
    
    stateData = state_data_type.to_dict(orient="records")
    return jsonify(stateData)

    
if __name__ == "__main__":
    app.run(debug=True)
