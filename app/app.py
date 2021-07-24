from flask import Flask, render_template, jsonify
import pandas as pd
from sqlalchemy import create_engine
import numpy as np

app = Flask(__name__)
engine = create_engine(
    'postgresql://postgres:samridhi@localhost:5432/crime-database')



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
    return jsonify(state_list)     


if __name__ == "__main__":
    app.run(debug=True)
