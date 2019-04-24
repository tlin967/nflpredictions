import pandas as pd
import numpy as np
from sklearn import tree
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn import svm
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.discriminant_analysis import QuadraticDiscriminantAnalysis
from sklearn.neural_network import MLPClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score
from sklearn.decomposition import PCA


#import and convert train data from csv into dataframe
data = pd.read_csv("alldata.csv")

#change schedule_playoff to 0 and 1
data.loc[data.schedule_playoff == False, 'schedule_playoff'] = 0
data.loc[data.schedule_playoff == True, 'schedule_playoff'] = 1

#change full_result to 0 and 1
data.loc[data.full_result == 'A', 'full_result'] = 0
data.loc[data.full_result == 'H', 'full_result'] = 1

#change words in schedule week to numbers
data.loc[data.schedule_week == 'Wildcard', 'schedule_week'] = 18
data.loc[data.schedule_week == 'Division', 'schedule_week'] = 19
data.loc[data.schedule_week == 'Conference', 'schedule_week'] = 20
data.loc[data.schedule_week == 'Superbowl', 'schedule_week'] = 21

#change stadium_neutral to 0 and 1
data.loc[data.stadium_neutral == False, 'stadium_neutral'] = 0
data.loc[data.stadium_neutral == True, 'stadium_neutral'] = 1

#drop uneccessary columns
cols_to_drop = ['stadium', 'score_home', 'score_away']
data = data.drop(cols_to_drop, axis=1)

# #only take complete cases
data.dropna(inplace=True)

#save dataframe with names for later use
dataWithNames = data[:]

#drop schedule date after saving it in dataWithNames
cols_to_drop = ['schedule_date']
data = data.drop(cols_to_drop, axis=1)

#converts columns into factors
col_to_transform = ['team_home', 'team_away', 'team_favorite_id','weather_detail']
data = pd.get_dummies(data = data, columns=col_to_transform)

#split data into train and test data
train_data = data[:]
#get index of all rows where season is 2018
index2018Names = train_data[ train_data['schedule_season'] == 2018 ].index

#store all rows where season is 2018 into test_data
test_data = train_data.loc[ train_data['schedule_season'] == 2018 ]
dataWithNames = dataWithNames.loc[ dataWithNames['schedule_season'] == 2018 ]

# Delete these row indexes from dataFrame
train_data.drop(index2018Names , inplace=True)

train_data.to_csv("currentTrainingDataset.csv")
test_data.to_csv("currentTestDataset.csv")
dataWithNames.to_csv("dataWithNames.csv")

# #normalize data attributes for test and train data
# x_train = train_data.values
# x_test = test_data.values
# #using the same scaler
# min_max_scaler = preprocessing.MinMaxScaler()
# x_train_scaled = min_max_scaler.fit_transform(x_train)
# x_test_scaled = min_max_scaler.fit_transform(x_test)
# train_data = pd.DataFrame(x_train_scaled, columns=train_data.columns)
# test_data = pd.DataFrame(x_test_scaled, columns=test_data.columns)


##################################################
# Used to split the training data into 2010-2016 #
# And test data into 2017-2018                   #
##################################################
# #split data into train and test data
# train_data = data[:]
# #get index of all rows where season is 2018
# index2018Names = train_data[ train_data['schedule_season'] == 2018 ].index
# index2017Names = train_data[ train_data['schedule_season'] == 2017 ].index
#
# #store all rows where season is 2018 and 2017
# test_data = train_data.loc[ (train_data['schedule_season'] == 2018) | (train_data['schedule_season'] == 2017)]
# dataWithNames = dataWithNames.loc[ (dataWithNames['schedule_season'] == 2018) | (dataWithNames['schedule_season'] == 2017)]
#
# # Delete these row indexes from dataFrame
# train_data.drop(index2018Names , inplace=True)
# train_data.drop(index2017Names , inplace=True)
#
# train_data.to_csv("currentTrainingDataset.csv")
# test_data.to_csv("currentTestDataset.csv")
# dataWithNames.to_csv("dataWithNames.csv")


#full_result 1 = Home Win, 0 = Away Win
count_class0, count_class1 = train_data.full_result.value_counts()

##################################################################
# #divide training data by class 0 or 1
train_away = train_data[train_data['full_result'] == 0]
train_home = train_data[train_data['full_result'] == 1]

# Down Sample
train_undersample = train_home.sample(count_class1)
down_train = pd.concat([train_undersample, train_away], axis=0)


print("# of H and A values in train data after down sampling")
print down_train.full_result.value_counts()
#create X and y sets of training data
X_train = down_train.drop(['full_result'], axis=1)
y_train = down_train['full_result']

#create X and y sets of training data
X_train = down_train.drop(['full_result'], axis=1)
y_train = down_train['full_result']

#create X and y sets of test data
X_test_data = test_data.drop(['full_result'], axis=1)
y_test_data = test_data['full_result']


print ("# of H and A values in test data: ")
print(test_data.full_result.value_counts())

#create logistic model
logreg = LogisticRegression(random_state=0, solver='lbfgs', max_iter=10000, class_weight='balanced')
logreg.fit(X_train, y_train)

#Predict with logistic regression
log_pred = logreg.predict(X_test_data)

#create SVM classifier
clf = svm.SVC(gamma=0.001, C=100.)
clf.fit(X_train, y_train)

#predict with svm
svm_predict = clf.predict(X_test_data)

#create KNN classifier
neigh = KNeighborsClassifier(n_neighbors=3)
neigh.fit(X_train, y_train)

#predict with knn
knn_predict = neigh.predict(X_test_data)

#create Decision Tree classifier
dtree_clf =  tree.DecisionTreeClassifier()
dtree_clf = dtree_clf.fit(X_train, y_train)

#predict with dtree
dtree_predict = dtree_clf.predict(X_test_data)

#create linear discriminant analysis
lin_clf = LinearDiscriminantAnalysis()
lin_clf.fit(X_train, y_train)

#predict with linn dis
lin_predict = lin_clf.predict(X_test_data)

#create naive bayes analysis
naive_clf = GaussianNB()
naive_predict = naive_clf.fit(X_train, y_train).predict(X_test_data)

#create random forest
rand_clf = RandomForestClassifier(max_depth=5, n_estimators=10, max_features=1)
rand_predict = rand_clf.fit(X_train, y_train).predict(X_test_data)

#neural net
neural_clf = MLPClassifier(alpha=1)
neural_predict = neural_clf.fit(X_train, y_train).predict(X_test_data)

#adaboost
ada_clf = AdaBoostClassifier()
ada_predict = ada_clf.fit(X_train, y_train).predict(X_test_data)

#quadratic discriminant discriminant
quad_clf = QuadraticDiscriminantAnalysis()
quad_predict = quad_clf.fit(X_train, y_train).predict(X_test_data)

for i in range(test_data.shape[0]):
    #find name of team that is home
    result = ''
    predicted_res = ''
    week = ''

    if quad_predict[i] == 0:
        predicted_res = dataWithNames.iloc[i]['team_away']
    else:
        predicted_res = dataWithNames.iloc[i]['team_home']


    if test_data.iloc[i]['full_result'] == 0:
        result = dataWithNames.iloc[i]['team_away']
    else:
        result = dataWithNames.iloc[i]['team_home']

    if test_data.iloc[i]['schedule_week'] == 21:
        week = 'Superbowl'
    elif test_data.iloc[i]['schedule_week'] == 20:
        week = 'Conference'
    elif test_data.iloc[i]['schedule_week'] == 19:
        week = 'Division'
    elif test_data.iloc[i]['schedule_week'] == 18:
        week = 'Wildcard'
    else:
        week = test_data.iloc[i]['schedule_week']

    print ("Year: %s, Week: %s\n  Team 1: %s\n  Team 2: %s\n    Predicted: %s\n    Actual: %s" % (dataWithNames.iloc[i]['schedule_season'], week, dataWithNames.iloc[i]['team_home'], dataWithNames.iloc[i]['team_away'], predicted_res, result))


#print results of log reg
print('\nAccuracy of LR classifier on test set: {:.3f}'.format(np.mean(log_pred == y_test_data)))

#print results of svm
print ('Accuracy of SVM classifier on test set: {:.3f}'.format(accuracy_score(y_test_data, svm_predict)))

#print results of knn
print ('Accuracy of KNN classifier on test set: {:.3f}'.format(accuracy_score(y_test_data, knn_predict)))

#print results of dtree
print ('Accuracy of DTREE classifier on test set: {:.3f}'.format(accuracy_score(y_test_data, dtree_predict)))

#print results of lin dis
print ('Accuracy of Linear Discriminant classifier on test set: {:.3f}'.format(accuracy_score(y_test_data, lin_predict)))

#print results of naive
print ('Accuracy of Naive classifier on test set: {:.3f}'.format(accuracy_score(y_test_data, naive_predict)))

#print results of rand
print ('Accuracy of Random Forest classifier on test set: {:.3f}'.format(accuracy_score(y_test_data, rand_predict)))

#print results of neural
print ('Accuracy of Neural Net classifier on test set: {:.3f}'.format(accuracy_score(y_test_data, neural_predict)))

#print results of ada
print ('Accuracy of ADA Boost classifier on test set: {:.3f}'.format(accuracy_score(y_test_data, ada_predict)))

#print results of quadratic
print ('Accuracy of Quadratic classifier on test set: {:.3f}'.format(accuracy_score(y_test_data, quad_predict)))

#################################################
#Used to make the csv file for predicted results#
#################################################
pred_data = pd.DataFrame(np.array(quad_predict), columns = ['predicted_result'])

#get all data up to everything including weather wind
newTest_data = test_data.loc[:, :'weather_wind_mph']

name_data = dataWithNames[['schedule_date', 'team_home', 'team_away', 'team_favorite_id']]

newTest_data.reset_index(inplace=True)
name_data.reset_index(inplace=True)

newTest_data.drop('index',axis=1,inplace=True)
name_data.drop('index', axis=1, inplace=True)

final_data = pd.concat([newTest_data, pred_data, name_data], axis = 1)

final_data.to_csv('predicted_result.csv')

# #show impact of each column?
# i = 0
# for col in X_train:
#     print ("%s : %s" % (col, logreg.coef_[0][i]))
#     i = i + 1
