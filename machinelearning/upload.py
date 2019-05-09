import pandas as pd
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred, {
  'projectId': 'nfl-predictions-45c7f'
})

db = firestore.client()

# #get objects in Users
# users_ref = db.collection(u'users')
# docs = users_ref.get()
# for doc in docs:
#     print(u'{} => {}'.format(doc.id, doc.to_dict()))


#import the csv as a dataframe
df = pd.read_csv("predicted_result.csv")
print df

for index, row in df.iterrows():
    #set where we want to save
    doc_ref = db.collection(u'predicted_results').document()
    dataObject = {
        u'id': row.id,
        u'schedule_date': row.schedule_date.strip().decode(),
        u'schedule_season': row.schedule_season,
        u'schedule_week': row.schedule_week,
        u'schedule_playoff': row.schedule_playoff,
        u'full_result': row.full_result,
        u'spread_favorite': row.spread_favorite,
        u'stadium_neutral': row.stadium_neutral,
        u'weather_temperature': row.weather_temperature,
        u'weather_wind_mph': row.weather_wind_mph,
        u'predicted_result': row.predicted_result,
        u'team_home': row.team_home.strip().decode(),
        u'team_away': row.team_away.strip().decode(),
        u'team_favorite_id': row.team_favorite_id.strip().decode()
    }
    print dataObject
    doc_ref.set(dataObject)
